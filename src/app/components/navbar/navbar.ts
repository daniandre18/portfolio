import { Component, ElementRef, HostListener, OnDestroy, AfterViewInit, inject, signal, computed } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  i18n = inject(I18nService);
  theme = inject(ThemeService);
  activeSection = signal('hero');
  menuOpen = signal(false);

  private elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer!: IntersectionObserver;

  readonly themeLabel = computed(() => {
    const light = this.theme.isLight();
    const lang = this.i18n.lang();
    return light ? (lang === 'es' ? 'oscuro' : 'dark') : (lang === 'es' ? 'claro' : 'light');
  });

  readonly themeIcon = computed(() => this.theme.isLight() ? '☾' : '☀');
  readonly langNextLabel = computed(() => this.i18n.lang() === 'es' ? 'EN' : 'ES');

  readonly menuAriaLabel = computed(() => {
    const es = this.i18n.lang() === 'es';
    if (this.menuOpen()) return es ? 'Cerrar menú' : 'Close menu';
    return es ? 'Abrir menú' : 'Open menu';
  });

  scrollTo(id: string) {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.closeMenu();
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeMenu();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.menuOpen()) return;
    if (!this.elRef.nativeElement.contains(event.target as Node)) {
      this.closeMenu();
    }
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
