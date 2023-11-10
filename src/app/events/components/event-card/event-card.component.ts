import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { FilmEvent } from 'src/app/events/models/film-event.interface';
import { fadeInOut } from 'src/app/shared/animations';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  animations: [fadeInOut]
})
export class EventCardComponent {
  @Input({ required: true }) event: FilmEvent = {} as FilmEvent;

  @Output() onCardClicked: EventEmitter<FilmEvent> = new EventEmitter<FilmEvent>();

  public imageLoaded = false;

  constructor(public elementRef: ElementRef) {}
}
