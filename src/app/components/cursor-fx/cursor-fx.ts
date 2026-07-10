import { Component, ElementRef, AfterViewInit, OnDestroy, viewChild, signal } from '@angular/core';

@Component({
  selector: 'app-cursor-fx',
  imports: [],
  templateUrl: './cursor-fx.html',
  styleUrl: './cursor-fx.scss'
})
export class CursorFxComponent implements AfterViewInit, OnDestroy {
  private glowRef = viewChild<ElementRef<HTMLElement>>('glow');
  private dotRef = viewChild<ElementRef<HTMLElement>>('dot');

  readonly active = signal(false);
  readonly pointerActive = signal(false);

  private raf = 0;
  private mouseX = 0;
  private mouseY = 0;
  private glowX = 0;
  private glowY = 0;
  private reduceMotion = false;
  private started = false;

  private readonly onMove = (e: MouseEvent) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    const dotEl = this.dotRef()?.nativeElement;
    if (dotEl) dotEl.style.transform = `translate3d(${this.mouseX}px, ${this.mouseY}px, 0) translate(-50%, -50%)`;

    if (this.reduceMotion) {
      const glowEl = this.glowRef()?.nativeElement;
      if (glowEl) glowEl.style.transform = `translate3d(${this.mouseX}px, ${this.mouseY}px, 0) translate(-50%, -50%)`;
    }
  };

  private readonly onOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    this.pointerActive.set(!!target.closest?.('a, button, input, textarea, select, [role="button"], .tab, .pill-btn, .menu-toggle'));
  };

  ngAfterViewInit() {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine || this.started) return;
    this.started = true;
    this.active.set(true);

    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.classList.add('cursor-fx-on');
    window.addEventListener('mousemove', this.onMove, { passive: true });
    window.addEventListener('mouseover', this.onOver, { passive: true });

    if (!this.reduceMotion) {
      const loop = () => {
        this.glowX += (this.mouseX - this.glowX) * 0.1;
        this.glowY += (this.mouseY - this.glowY) * 0.1;
        const glowEl = this.glowRef()?.nativeElement;
        if (glowEl) glowEl.style.transform = `translate3d(${this.glowX}px, ${this.glowY}px, 0) translate(-50%, -50%)`;
        this.raf = requestAnimationFrame(loop);
      };
      this.raf = requestAnimationFrame(loop);
    }
  }

  ngOnDestroy() {
    if (!this.started) return;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('mousemove', this.onMove);
    window.removeEventListener('mouseover', this.onOver);
    document.body.classList.remove('cursor-fx-on');
  }
}
