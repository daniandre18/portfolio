import { Component, ElementRef, OnInit, ViewChild, inject, signal, computed, effect } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { dict, Lang } from '../../data/portfolio.data';

type OutputKind =
  | 'welcome' | 'help' | 'whoami'
  | 'navExperience' | 'navSkills' | 'navProjects' | 'navContact'
  | 'coffee' | 'bjj' | 'langSwitched' | 'notFound';

interface HistoryItem {
  isCMD: boolean;
  raw?: string;
  kind?: OutputKind;
  param?: string;
  html?: string;
}

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent implements OnInit {
  i18n = inject(I18nService);

  @ViewChild('termBodyRef') termBodyRef!: ElementRef<HTMLElement>;

  history = signal<HistoryItem[]>([]);

  readonly heroSub = computed(() => dict.heroSub[this.i18n.lang()]);
  readonly heroRole = computed(() => dict.heroRole[this.i18n.lang()]);
  readonly downloadLabel = computed(() => dict.downloadCv[this.i18n.lang()]);
  readonly inputPlaceholder = computed(() => this.i18n.lang() === 'es' ? "escribe 'help'…" : "type 'help'…");

  readonly historyView = computed(() => {
    const lang = this.i18n.lang();
    return this.history().map(item => item.isCMD
      ? item
      : { ...item, html: this.renderOutput(item.kind!, lang, item.param) });
  });

  private langChangedMsg = false;

  constructor() {
    effect(() => {
      const lang = this.i18n.lang();
      if (this.langChangedMsg) {
        this.appendOutput('langSwitched', lang);
      }
      this.langChangedMsg = true;
    });
  }

  ngOnInit() {
    this.appendOutput('welcome');
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

  private renderOutput(kind: OutputKind, lang: Lang, param?: string): string {
    switch (kind) {
      case 'welcome': return dict.termWelcome[lang];
      case 'help': return dict.termHelp[lang].replace(/\n/g, '<br>');
      case 'whoami': return dict.termWhoami[lang].replace(/\n/g, '<br>');
      case 'navExperience': return dict.termNav.experience[lang];
      case 'navSkills': return dict.termNav.skills[lang];
      case 'navProjects': return dict.termNav.projects[lang];
      case 'navContact': return dict.termNav.contact[lang];
      case 'coffee': return dict.termCoffee[lang];
      case 'bjj': return dict.termOss[lang];
      case 'langSwitched': return dict.termLangSwitched[(param as Lang) ?? lang];
      case 'notFound': return lang === 'es'
        ? `bash: ${param}: comando no encontrado. Escribe "help" para ver opciones.`
        : `bash: ${param}: command not found. Type "help" to see options.`;
    }
  }

  private appendCmd(raw: string) {
    this.history.update(h => [...h, { isCMD: true, raw }]);
  }

  private appendOutput(kind: OutputKind, param?: string) {
    this.history.update(h => [...h, { isCMD: false, kind, param }]);
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

    if (cmd === 'help') {
      this.appendOutput('help');
    } else if (cmd === 'whoami' || cmd === 'whoami --verbose') {
      this.appendOutput('whoami');
    } else if (cmd === 'experience' || cmd === 'experiencia') {
      this.appendOutput('navExperience');
      document.getElementById('experiencia')?.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd === 'skills') {
      this.appendOutput('navSkills');
      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd === 'projects' || cmd === 'proyectos') {
      this.appendOutput('navProjects');
      document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd === 'contact' || cmd === 'contacto') {
      this.appendOutput('navContact');
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd === 'sudo make-coffee' || cmd === 'make-coffee') {
      this.appendOutput('coffee');
    } else if (cmd === 'bjj' || cmd === 'jiujitsu') {
      this.appendOutput('bjj');
    } else if (cmd === 'lang en') {
      this.i18n.set('en');
    } else if (cmd === 'lang es') {
      this.i18n.set('es');
    } else {
      this.appendOutput('notFound', raw.trim());
    }

    setTimeout(() => {
      if (this.termBodyRef) {
        this.termBodyRef.nativeElement.scrollTop = this.termBodyRef.nativeElement.scrollHeight;
      }
    });
  }
}
