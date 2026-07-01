import { Component, OnDestroy, AfterViewInit, inject, signal, computed } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html'
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  i18n = inject(I18nService);
  theme = inject(ThemeService);
  activeSection = signal('hero');

  private observer!: IntersectionObserver;

  readonly themeLabel = computed(() => {
    const light = this.theme.isLight();
    const lang = this.i18n.lang();
    return light ? (lang === 'es' ? 'oscuro' : 'dark') : (lang === 'es' ? 'claro' : 'light');
  });

  readonly themeIcon = computed(() => this.theme.isLight() ? '☾' : '☀');
  readonly langNextLabel = computed(() => this.i18n.lang() === 'es' ? 'EN' : 'ES');

  scrollTo(id: string) {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  ngAfterViewInit() {
    const ids = ['hero', 'experiencia', 'skills', 'proyectos', 'contacto'];
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) this.activeSection.set(e.target.id);
      });
    }, { threshold: 0.35, rootMargin: '-80px 0px -40% 0px' });

    sections.forEach(s => this.observer.observe(s));
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
