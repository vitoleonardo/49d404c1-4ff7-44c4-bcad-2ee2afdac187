import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared/shared.module';
import { EventCardComponent } from './components/event-card/event-card.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { EventsComponent } from './events.component';

@NgModule({
  declarations: [EventsComponent, NavBarComponent, EventCardComponent],
  imports: [CommonModule, MatIconModule, SharedModule, MatTooltipModule, BrowserModule],
  exports: [EventsComponent]
})
export class EventsModule {}
