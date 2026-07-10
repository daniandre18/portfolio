import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { StatsComponent } from './components/stats/stats';
import { AboutComponent } from './components/about/about';
import { ExperienceComponent } from './components/experience/experience';
import { SkillsComponent } from './components/skills/skills';
import { ProjectsComponent } from './components/projects/projects';
import { ContactComponent } from './components/contact/contact';
import { CursorFxComponent } from './components/cursor-fx/cursor-fx';
import { ChatWidgetComponent } from './components/chat-widget/chat-widget';
import { RevealDirective } from './directives/reveal.directive';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    HeroComponent,
    StatsComponent,
    AboutComponent,
    ExperienceComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    CursorFxComponent,
    ChatWidgetComponent,
    RevealDirective
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
