import { Component, inject, computed, signal } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { dict, expData, earlyData, earlyHeader } from '../../data/portfolio.data';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.scss'
})
export class ExperienceComponent {
  i18n = inject(I18nService);

  private readonly flippedSet = signal<Set<string>>(new Set());

  readonly title = computed(() => dict.expTitle[this.i18n.lang()]);
  readonly hintFront = computed(() => dict.expHintFront[this.i18n.lang()]);
  readonly hintBack = computed(() => dict.expHintBack[this.i18n.lang()]);
  readonly earlyHeaderText = computed(() => earlyHeader[this.i18n.lang()]);

  readonly expItems = computed(() => {
    const lang = this.i18n.lang();
    return expData.map((e, i) => ({
      current: e.current,
      date: e.date,
      co: e.co,
      coName: e.co.split('·')[0].trim(),
      logo: e.logo,
      logoMono: e.logoMono !== false,
      num: String(i + 1).padStart(2, '0'),
      role: e.role[lang],
      bullets: e.bullets[lang],
      tags: e.tags
    }));
  });

  readonly earlyItems = computed(() => {
    const lang = this.i18n.lang();
    return earlyData.map(e => ({
      role: e.role[lang],
      co: e.co,
      date: e.date,
      desc: e.desc[lang]
    }));
  });

  isFlipped(key: string): boolean {
    return this.flippedSet().has(key);
  }

  toggleFlip(key: string): void {
    const next = new Set(this.flippedSet());
    next.has(key) ? next.delete(key) : next.add(key);
    this.flippedSet.set(next);
  }
}
