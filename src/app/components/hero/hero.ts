import { Component, ElementRef, OnInit, ViewChild, inject, signal, computed, effect } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { dict } from '../../data/portfolio.data';

interface HistoryItem {
  isCMD: boolean;
  raw?: string;
  html?: string;
}

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html'
})
export class HeroComponent implements OnInit {
  i18n = inject(I18nService);

  @ViewChild('termBodyRef') termBodyRef!: ElementRef<HTMLElement>;

  history = signal<HistoryItem[]>([]);

  readonly heroSub = computed(() => dict.heroSub[this.i18n.lang()]);
  readonly heroRole = computed(() => dict.heroRole[this.i18n.lang()]);
  readonly downloadLabel = computed(() => dict.downloadCv[this.i18n.lang()]);
  readonly inputPlaceholder = computed(() => this.i18n.lang() === 'es' ? "escribe 'help'…" : "type 'help'…");

  private langChangedMsg = false;

  constructor() {
    effect(() => {
      const lang = this.i18n.lang();
      if (this.langChangedMsg) {
        this.appendOutput(dict.termLangSwitched[lang]);
      }
      this.langChangedMsg = true;
    });
  }

  ngOnInit() {
    this.appendOutput(dict.termWelcome[this.i18n.lang()]);
  }

  scrollTo(id: string) {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onEnter(input: HTMLInputElement) {
    const val = input.value;
    input.value = '';
    this.runCommand(val);
  }

  focusTerminal() {
    const input = document.querySelector('.term-input') as HTMLInputElement;
    input?.focus();
  }

  private appendCmd(raw: string) {
    this.history.update(h => [...h, { isCMD: true, raw }]);
  }

  private appendOutput(html: string) {
    this.history.update(h => [...h, { isCMD: false, html }]);
    setTimeout(() => {
      if (this.termBodyRef) {
        this.termBodyRef.nativeElement.scrollTop = this.termBodyRef.nativeElement.scrollHeight;
      }
    });
  }

  private runCommand(raw: string) {
    const cmd = raw.trim().toLowerCase();
    this.appendCmd(raw);

    if (cmd === '') return;

    if (cmd === 'clear' || cmd === 'cls') {
      this.history.set([]);
      return;
    }

    const lang = this.i18n.lang();

    if (cmd === 'help') {
      this.appendOutput(dict.termHelp[lang].replace(/\n/g, '<br>'));
    } else if (cmd === 'whoami' || cmd === 'whoami --verbose') {
      this.appendOutput(dict.termWhoami[lang].replace(/\n/g, '<br>'));
    } else if (cmd === 'experience' || cmd === 'experiencia') {
      this.appendOutput(dict.termNav.experience[lang]);
      document.getElementById('experiencia')?.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd === 'skills') {
      this.appendOutput(dict.termNav.skills[lang]);
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd === 'projects' || cmd === 'proyectos') {
      this.appendOutput(dict.termNav.projects[lang]);
      document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd === 'contact' || cmd === 'contacto') {
      this.appendOutput(dict.termNav.contact[lang]);
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd === 'sudo make-coffee' || cmd === 'make-coffee') {
      this.appendOutput(dict.termCoffee[lang]);
    } else if (cmd === 'bjj' || cmd === 'jiujitsu') {
      this.appendOutput(dict.termOss[lang]);
    } else if (cmd === 'lang en') {
      this.i18n.set('en');
    } else if (cmd === 'lang es') {
      this.i18n.set('es');
    } else {
      const notFound = lang === 'es'
        ? `bash: ${raw.trim()}: comando no encontrado. Escribe "help" para ver opciones.`
        : `bash: ${raw.trim()}: command not found. Type "help" to see options.`;
      this.appendOutput(notFound);
    }

    setTimeout(() => {
      if (this.termBodyRef) {
        this.termBodyRef.nativeElement.scrollTop = this.termBodyRef.nativeElement.scrollHeight;
      }
    });
  }
}
