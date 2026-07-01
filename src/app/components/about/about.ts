import { Component, inject, computed } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { dict } from '../../data/portfolio.data';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html'
})
export class AboutComponent {
  i18n = inject(I18nService);
  readonly title = computed(() => dict.aboutTitle[this.i18n.lang()]);
  readonly aboutText = computed(() => dict.aboutText[this.i18n.lang()]);
  readonly infoCard = computed(() => dict.infoCard[this.i18n.lang()]);
}
