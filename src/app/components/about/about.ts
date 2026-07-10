import { Component, inject, computed } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { dict, hobbies, education } from '../../data/portfolio.data';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent {
  i18n = inject(I18nService);
  readonly title = computed(() => dict.aboutTitle[this.i18n.lang()]);
  readonly aboutText = computed(() => dict.aboutText[this.i18n.lang()]);
  readonly infoCard = computed(() => dict.infoCard[this.i18n.lang()]);
  readonly hobbiesLabel = computed(() => dict.hobbiesLabel[this.i18n.lang()]);
  readonly hobbyItems = computed(() => {
    const lang = this.i18n.lang();
    return hobbies.map(h => ({ icon: h.icon, label: h.label[lang] }));
  });
  readonly educationLabel = computed(() => dict.educationLabel[this.i18n.lang()]);
  readonly educationItems = computed(() => {
    const lang = this.i18n.lang();
    return education.map(e => ({
      degree: e.degree[lang],
      school: e.school,
      date: e.date,
      note: e.note[lang]
    }));
  });
}
