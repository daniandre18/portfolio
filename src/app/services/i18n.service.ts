import { Injectable, signal } from '@angular/core';
import { Lang } from '../data/portfolio.data';

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<Lang>('es');

  toggle() {
    const next: Lang = this.lang() === 'es' ? 'en' : 'es';
    this.set(next);
  }

  set(lang: Lang) {
    this.lang.set(lang);
    document.documentElement.lang = lang;
  }
}
