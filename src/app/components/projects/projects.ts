import { Component, inject, computed } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { dict, projects } from '../../data/portfolio.data';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class ProjectsComponent {
  i18n = inject(I18nService);

  readonly title = computed(() => dict.projTitle[this.i18n.lang()]);

  readonly projectItems = computed(() => {
    const lang = this.i18n.lang();
    return projects.map(p => ({
      tag: p.tag[lang],
      name: p.name[lang],
      desc: p.desc[lang],
      stack: p.stack
    }));
  });
}
