import { Component, ElementRef, Input } from '@angular/core';
import { FilmEvent } from 'src/app/events/models/film-event.interface';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {
  @Input() event!: FilmEvent;

  constructor(public elementRef: ElementRef) {}
}
