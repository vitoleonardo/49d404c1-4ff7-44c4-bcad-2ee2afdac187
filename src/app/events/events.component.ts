import { Component, HostListener, Input, OnChanges, QueryList, ViewChildren } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventCardComponent } from './components/event-card/event-card.component';
import { FilmEvent } from './models/film-event.interface';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnChanges {
  @ViewChildren(EventCardComponent) eventCards!: QueryList<EventCardComponent>;

  @Input() events!: FilmEvent[];

  public firstVisibleDate$ = new BehaviorSubject<Date | undefined>(undefined);

  public ngOnChanges() {
    const firstDate = this.events[0]?.startTime;
    if (!firstDate) return;
    this.firstVisibleDate$.next(new Date(firstDate));
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.updateFirstVisibleDate();
  }

  private updateFirstVisibleDate() {
    const firstVisibleEventCard = this.eventCards.find(eventCard => this.isElementVisible(eventCard.elementRef.nativeElement));

    if (firstVisibleEventCard) {
      const date = new Date(firstVisibleEventCard.event.startTime);
      this.firstVisibleDate$.next(date);
    }
  }

  private isElementVisible(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth;
  }
}
