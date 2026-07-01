import { Component, inject, computed, signal } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { dict } from '../../data/portfolio.data';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html'
})
export class ContactComponent {
  i18n = inject(I18nService);
  copied = signal(false);

  readonly c = computed(() => dict.contact[this.i18n.lang()]);
  readonly title = computed(() => dict.contactTitle[this.i18n.lang()]);
  readonly footerText = computed(() => dict.footerText[this.i18n.lang()]);

  copyEmail() {
    navigator.clipboard.writeText('daniandre18@gmail.com').then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    });
  }
}
