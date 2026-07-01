import { Component, inject, computed } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { dict, skills, belts } from '../../data/portfolio.data';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html'
})
export class SkillsComponent {
  i18n = inject(I18nService);

  readonly title = computed(() => dict.skillsTitle[this.i18n.lang()]);
  readonly beltNote = computed(() => dict.beltNote[this.i18n.lang()]);

  readonly skillItems = computed(() => {
    const lang = this.i18n.lang();
    return skills.map(s => {
      const b = belts[s.belt];
      return {
        name: s.name,
        stripes: Array(s.stripes).fill(0),
        years: s.years[lang],
        beltLabel: b.label[lang],
        beltColor: b.color,
        beltTextOn: b.textOn
      };
    });
  });
}
