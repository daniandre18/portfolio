import { Component, inject, computed } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { stats } from '../../data/portfolio.data';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.html'
})
export class StatsComponent {
  i18n = inject(I18nService);
  readonly items = computed(() => stats.map(s => ({ num: s.num, label: s.label[this.i18n.lang()] })));
}
