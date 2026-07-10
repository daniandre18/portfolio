import { Component, ElementRef, AfterViewInit, OnDestroy, inject, computed, signal, viewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { I18nService } from '../../services/i18n.service';
import { dict, skills, belts, type Lang, type SkillCategory } from '../../data/portfolio.data';

type Filter = SkillCategory | 'all';

interface NudgeAnim {
  from: number;
  to: number;
  start: number;
  dur: number;
}

const CATEGORY_ORDER: SkillCategory[] = ['frontend', 'backend', 'database', 'tools', 'testing'];

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
  readonly activeFilter = signal<Filter>('all');
  readonly isAll = computed(() => this.activeFilter() === 'all');

  private readonly categoryLabel: Record<SkillCategory, Record<Lang, string>> = {
    frontend: dict.skillsFrontend,
    backend: dict.skillsBackend,
    database: dict.skillsDatabase,
    tools: dict.skillsTools,
    testing: dict.skillsTesting
  };

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

  readonly categories = computed(() => {
    const lang = this.i18n.lang();
    return CATEGORY_ORDER.map(id => {
      const items = skills.filter(s => s.category === id).map(s => this.mapSkill(s, lang));
      return { id, label: this.categoryLabel[id][lang], count: items.length, items };
    });
  });

  readonly filterOptions = computed(() => {
    const lang = this.i18n.lang();
    return [
      { id: 'all' as Filter, label: dict.skillsAll[lang], count: skills.length },
      ...this.categories().map(c => ({ id: c.id as Filter, label: c.label, count: c.count }))
    ];
  });

  /** Static grid items — used for every filter except "all". */
  readonly visibleItems = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') return [];
    return this.categories().find(c => c.id === filter)?.items ?? [];
  });

  /** Doubled (for a seamless loop) list backing the single "all" slider. */
  readonly allDoubled = computed(() => {
    const items = this.categories().flatMap(c => c.items);
    return [...items, ...items];
  });

  setFilter(id: Filter) {
    this.activeFilter.set(id);
    if (id === 'all') {
      setTimeout(() => this.measure());
    }
  }

  // ---- single "all" slider: auto-scroll + drag + arrows ----
  private readonly trackRef = viewChild<ElementRef<HTMLElement>>('track');

  private readonly speed = 16; // px/second
  private readonly nudgeStep = 240; // px per arrow click
  private readonly nudgePauseMs = 3000; // stay still after manual navigation

  private offset = 0;
  private half = 0;
  private hovered = false;
  private resumeAt = 0;
  private anim: NudgeAnim | null = null;
  private dragging = false;
  private dragStartX = 0;
  private dragStartOffset = 0;
  private reduceMotion = false;
  private lastT = 0;
  private raf = 0;

  readonly isDragging = signal(false);

  ngAfterViewInit() {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.measure();
    this.lastT = performance.now();
    this.raf = requestAnimationFrame(this.tick);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.raf);
  }

  setPaused(hovered: boolean) {
    this.hovered = hovered;
  }

  onPointerDown(e: PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this.dragging = true;
    this.isDragging.set(true);
    this.anim = null;
    this.dragStartX = e.clientX;
    this.dragStartOffset = this.offset;
  }

  onPointerMove(e: PointerEvent) {
    if (!this.dragging) return;
    const dx = e.clientX - this.dragStartX;
    this.offset = this.wrap(this.dragStartOffset + dx, this.half);
  }

  onPointerUp(e: PointerEvent) {
    const el = e.currentTarget as HTMLElement;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    this.dragging = false;
    this.isDragging.set(false);
    this.resumeAt = performance.now() + this.nudgePauseMs;
  }

  nudge(dir: 1 | -1) {
    const now = performance.now();
    const from = this.offset;
    const rawTarget = this.wrap(from - dir * this.nudgeStep, this.half);
    const to = this.closestEquivalent(from, rawTarget, this.half);
    this.anim = { from, to, start: now, dur: 420 };
    this.resumeAt = now + this.nudgePauseMs;
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

  private measure() {
    const el = this.trackRef()?.nativeElement;
    if (!el) return;
    this.half = el.scrollWidth / 2;
    this.offset = this.wrap(this.offset, this.half);
  }

  private readonly tick = (t: number) => {
    const dt = (t - this.lastT) / 1000;
    this.lastT = t;

    if (this.isAll() && !this.reduceMotion) {
      if (this.anim) {
        const { from, to, start, dur } = this.anim;
        const p = Math.min(1, (t - start) / dur);
        this.offset = from + (to - from) * this.easeOutCubic(p);
        if (p >= 1) {
          this.offset = this.wrap(to, this.half);
          this.anim = null;
        }
      } else if (!this.hovered && !this.dragging && t >= this.resumeAt) {
        this.offset = this.wrap(this.offset - this.speed * dt, this.half);
      }

      const el = this.trackRef()?.nativeElement;
      if (el) el.style.transform = `translateX(${this.offset}px)`;
    }

    this.raf = requestAnimationFrame(this.tick);
  };
}
