import { Component, ElementRef, AfterViewInit, OnDestroy, inject, computed, viewChild } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { dict, skills, belts, type Lang, type SkillCategory } from '../../data/portfolio.data';

type Track = 'front' | 'back';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  i18n = inject(I18nService);

  readonly title = computed(() => dict.skillsTitle[this.i18n.lang()]);
  readonly beltNote = computed(() => dict.beltNote[this.i18n.lang()]);
  readonly frontendLabel = computed(() => dict.skillsFrontend[this.i18n.lang()]);
  readonly backendLabel = computed(() => dict.skillsBackend[this.i18n.lang()]);

  private mapSkill(s: (typeof skills)[number], lang: Lang) {
    const b = belts[s.belt];
    return {
      name: s.name,
      logo: s.logo,
      stripes: Array(s.stripes).fill(0),
      years: s.years[lang],
      beltLabel: b.label[lang],
      beltColor: b.color,
      beltTextOn: b.textOn
    };
  }

  private byCategory(category: SkillCategory) {
    return computed(() => {
      const lang = this.i18n.lang();
      const items = skills.filter(s => s.category === category).map(s => this.mapSkill(s, lang));
      return [...items, ...items];
    });
  }

  readonly frontendItems = this.byCategory('frontend');
  readonly backendItems = this.byCategory('backend');

  private readonly frontTrackRef = viewChild<ElementRef<HTMLElement>>('frontTrack');
  private readonly backTrackRef = viewChild<ElementRef<HTMLElement>>('backTrack');

  private readonly speed = 34; // px/second
  private readonly nudgeStep = 240; // px per arrow click

  private frontOffset = 0;
  private backOffset = 0;
  private frontHalf = 0;
  private backHalf = 0;
  private frontPaused = false;
  private backPaused = false;
  private reduceMotion = false;
  private lastT = 0;
  private raf = 0;

  ngAfterViewInit() {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.frontHalf = this.frontTrackRef()?.nativeElement.scrollWidth! / 2 || 0;
    this.backHalf = this.backTrackRef()?.nativeElement.scrollWidth! / 2 || 0;
    this.backOffset = -this.backHalf;
    this.lastT = performance.now();
    this.raf = requestAnimationFrame(this.tick);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.raf);
  }

  setPaused(track: Track, paused: boolean) {
    if (track === 'front') this.frontPaused = paused;
    else this.backPaused = paused;
  }

  nudge(track: Track, dir: 1 | -1) {
    if (track === 'front') {
      this.frontOffset = this.wrap(this.frontOffset - dir * this.nudgeStep, this.frontHalf);
    } else {
      this.backOffset = this.wrap(this.backOffset + dir * this.nudgeStep, this.backHalf);
    }
  }

  private wrap(offset: number, half: number): number {
    if (!half) return 0;
    let m = offset % half;
    if (m > 0) m -= half;
    return m;
  }

  private readonly tick = (t: number) => {
    const dt = (t - this.lastT) / 1000;
    this.lastT = t;

    if (!this.reduceMotion) {
      if (!this.frontPaused) this.frontOffset = this.wrap(this.frontOffset - this.speed * dt, this.frontHalf);
      if (!this.backPaused) this.backOffset = this.wrap(this.backOffset + this.speed * dt, this.backHalf);
    }

    const front = this.frontTrackRef()?.nativeElement;
    const back = this.backTrackRef()?.nativeElement;
    if (front) front.style.transform = `translateX(${this.frontOffset}px)`;
    if (back) back.style.transform = `translateX(${this.backOffset}px)`;

    this.raf = requestAnimationFrame(this.tick);
  };
}
