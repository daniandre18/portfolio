import { Component, ElementRef, AfterViewInit, OnDestroy, inject, computed, viewChild, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { I18nService } from '../../services/i18n.service';
import { dict, skills, belts, type Lang, type SkillCategory } from '../../data/portfolio.data';

type Track = 'front' | 'back';

interface NudgeAnim {
  from: number;
  to: number;
  start: number;
  dur: number;
}

const MOBILE_QUERY = '(max-width: 680px)';

@Component({
  selector: 'app-skills',
  imports: [NgTemplateOutlet],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class SkillsComponent implements AfterViewInit, OnDestroy {
  i18n = inject(I18nService);

  readonly title = computed(() => dict.skillsTitle[this.i18n.lang()]);
  readonly beltNote = computed(() => dict.beltNote[this.i18n.lang()]);
  readonly frontendLabel = computed(() => dict.skillsFrontend[this.i18n.lang()]);
  readonly backendLabel = computed(() => dict.skillsBackend[this.i18n.lang()]);
  readonly isMobile = signal(false);

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

  private byCategory(category: SkillCategory, duplicate: boolean) {
    return computed(() => {
      const lang = this.i18n.lang();
      const items = skills.filter(s => s.category === category).map(s => this.mapSkill(s, lang));
      return duplicate ? [...items, ...items] : items;
    });
  }

  readonly frontendItems = this.byCategory('frontend', true);
  readonly backendItems = this.byCategory('backend', true);
  readonly frontendSingle = this.byCategory('frontend', false);
  readonly backendSingle = this.byCategory('backend', false);

  private readonly frontTrackRef = viewChild<ElementRef<HTMLElement>>('frontTrack');
  private readonly backTrackRef = viewChild<ElementRef<HTMLElement>>('backTrack');

  private readonly speed = 16; // px/second
  private readonly nudgeStep = 240; // px per arrow click
  private readonly nudgePauseMs = 3000; // stay still after manual navigation

  private frontOffset = 0;
  private backOffset = 0;
  private frontHalf = 0;
  private backHalf = 0;
  private frontHovered = false;
  private backHovered = false;
  private frontResumeAt = 0;
  private backResumeAt = 0;
  private frontAnim: NudgeAnim | null = null;
  private backAnim: NudgeAnim | null = null;
  private frontDragging = false;
  private backDragging = false;
  private dragStartX = 0;
  private dragStartOffset = 0;
  private reduceMotion = false;
  private lastT = 0;
  private raf = 0;
  private mq!: MediaQueryList;

  private readonly onMqChange = (e: MediaQueryListEvent) => {
    this.isMobile.set(e.matches);
    if (e.matches) {
      cancelAnimationFrame(this.raf);
    } else {
      setTimeout(() => this.startLoop());
    }
  };

  ngAfterViewInit() {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.mq = window.matchMedia(MOBILE_QUERY);
    this.isMobile.set(this.mq.matches);
    this.mq.addEventListener('change', this.onMqChange);
    if (!this.isMobile()) this.startLoop();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.raf);
    this.mq?.removeEventListener('change', this.onMqChange);
  }

  setPaused(track: Track, hovered: boolean) {
    if (track === 'front') this.frontHovered = hovered;
    else this.backHovered = hovered;
  }

  isDragging(track: Track): boolean {
    return track === 'front' ? this.frontDragging : this.backDragging;
  }

  onPointerDown(track: Track, e: PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this.dragStartX = e.clientX;
    this.dragStartOffset = track === 'front' ? this.frontOffset : this.backOffset;
    if (track === 'front') {
      this.frontDragging = true;
      this.frontAnim = null;
    } else {
      this.backDragging = true;
      this.backAnim = null;
    }
  }

  onPointerMove(track: Track, e: PointerEvent) {
    if (!this.isDragging(track)) return;
    const dx = e.clientX - this.dragStartX;
    if (track === 'front') {
      this.frontOffset = this.wrap(this.dragStartOffset + dx, this.frontHalf);
    } else {
      this.backOffset = this.wrap(this.dragStartOffset + dx, this.backHalf);
    }
  }

  onPointerUp(track: Track, e: PointerEvent) {
    const el = e.currentTarget as HTMLElement;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    const resumeAt = performance.now() + this.nudgePauseMs;
    if (track === 'front') {
      this.frontDragging = false;
      this.frontResumeAt = resumeAt;
    } else {
      this.backDragging = false;
      this.backResumeAt = resumeAt;
    }
  }

  nudge(track: Track, dir: 1 | -1) {
    const now = performance.now();
    const resumeAt = now + this.nudgePauseMs;
    if (track === 'front') {
      const from = this.frontOffset;
      const rawTarget = this.wrap(from - dir * this.nudgeStep, this.frontHalf);
      const to = this.closestEquivalent(from, rawTarget, this.frontHalf);
      this.frontAnim = { from, to, start: now, dur: 420 };
      this.frontResumeAt = resumeAt;
    } else {
      const from = this.backOffset;
      const rawTarget = this.wrap(from + dir * this.nudgeStep, this.backHalf);
      const to = this.closestEquivalent(from, rawTarget, this.backHalf);
      this.backAnim = { from, to, start: now, dur: 420 };
      this.backResumeAt = resumeAt;
    }
  }

  private wrap(offset: number, half: number): number {
    if (!half) return 0;
    let m = offset % half;
    if (m > 0) m -= half;
    return m;
  }

  /** Picks the representation of `target` (mod half) closest to `from`, so the eased
   *  animation takes the short path instead of sweeping across the wrap boundary. */
  private closestEquivalent(from: number, target: number, half: number): number {
    if (!half) return target;
    let best = target;
    let bestDist = Math.abs(target - from);
    for (const cand of [target - half, target + half]) {
      const d = Math.abs(cand - from);
      if (d < bestDist) {
        best = cand;
        bestDist = d;
      }
    }
    return best;
  }

  private easeOutCubic(x: number): number {
    return 1 - Math.pow(1 - x, 3);
  }

  private startLoop() {
    const front = this.frontTrackRef()?.nativeElement;
    const back = this.backTrackRef()?.nativeElement;
    if (!front || !back) return;

    this.frontHalf = front.scrollWidth / 2;
    this.backHalf = back.scrollWidth / 2;
    this.frontOffset = 0;
    this.backOffset = -this.backHalf;
    this.lastT = performance.now();
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(this.tick);
  }

  private readonly tick = (t: number) => {
    if (this.isMobile()) return;

    const dt = (t - this.lastT) / 1000;
    this.lastT = t;

    if (!this.reduceMotion) {
      if (this.frontAnim) {
        const { from, to, start, dur } = this.frontAnim;
        const p = Math.min(1, (t - start) / dur);
        this.frontOffset = from + (to - from) * this.easeOutCubic(p);
        if (p >= 1) {
          this.frontOffset = this.wrap(to, this.frontHalf);
          this.frontAnim = null;
        }
      } else if (!this.frontHovered && !this.frontDragging && t >= this.frontResumeAt) {
        this.frontOffset = this.wrap(this.frontOffset - this.speed * dt, this.frontHalf);
      }

      if (this.backAnim) {
        const { from, to, start, dur } = this.backAnim;
        const p = Math.min(1, (t - start) / dur);
        this.backOffset = from + (to - from) * this.easeOutCubic(p);
        if (p >= 1) {
          this.backOffset = this.wrap(to, this.backHalf);
          this.backAnim = null;
        }
      } else if (!this.backHovered && !this.backDragging && t >= this.backResumeAt) {
        this.backOffset = this.wrap(this.backOffset + this.speed * dt, this.backHalf);
      }
    }

    const front = this.frontTrackRef()?.nativeElement;
    const back = this.backTrackRef()?.nativeElement;
    if (front) front.style.transform = `translateX(${this.frontOffset}px)`;
    if (back) back.style.transform = `translateX(${this.backOffset}px)`;

    this.raf = requestAnimationFrame(this.tick);
  };
}
