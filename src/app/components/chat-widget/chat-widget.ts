import { Component, inject, computed, signal } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { dict } from '../../data/portfolio.data';

const WHATSAPP_NUMBER = '573057104294';

@Component({
  selector: 'app-chat-widget',
  imports: [],
  templateUrl: './chat-widget.html',
  styleUrl: './chat-widget.scss'
})
export class ChatWidgetComponent {
  i18n = inject(I18nService);

  readonly open = signal(false);

  readonly toggleLabel = computed(() => dict.chatToggle[this.i18n.lang()]);
  readonly name = computed(() => dict.chatName[this.i18n.lang()]);
  readonly role = computed(() => dict.chatRole[this.i18n.lang()]);
  readonly greeting = computed(() => dict.chatGreeting[this.i18n.lang()]);
  readonly cta = computed(() => dict.chatCta[this.i18n.lang()]);

  readonly whatsappUrl = computed(() => {
    const text = encodeURIComponent(dict.chatPrefill[this.i18n.lang()]);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  });

  toggle() {
    this.open.update(v => !v);
  }
}
