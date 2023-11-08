import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../shared/shared.module';
import { ShoppingCartModalComponent } from './components/cart-modal/cart-modal.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { EventsComponent } from './events.component';
import { EventState } from './state/events.state';
@NgModule({
  declarations: [EventsComponent, NavBarComponent, EventCardComponent, ShoppingCartModalComponent],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatDialogModule,
    MatIconModule,
    SharedModule,
    MatTooltipModule,
    BrowserModule,
    NgxsModule.forFeature([EventState])
  ],
  exports: [EventsComponent]
})
export class EventsModule {}
