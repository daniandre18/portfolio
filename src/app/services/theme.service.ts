import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isLight = signal(false);

  toggle() {
    const next = !this.isLight();
    this.isLight.set(next);
    document.body.classList.toggle('light', next);
  }
}
