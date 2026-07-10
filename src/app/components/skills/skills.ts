import { Component, inject, computed } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { dict, skills, belts, type Lang, type SkillCategory } from '../../data/portfolio.data';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class SkillsComponent {
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
}
