import { AfterViewChecked, Component, DestroyRef, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { fadeInOut } from '../shared/animations';
import { ShoppingCartModalComponent } from './components/cart-modal/cart-modal.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { FilmEvent } from './models/film-event.interface';
import { ShoppingCart } from './models/shopping-cart.interface';
import { AddEventToCart, LoadEvents } from './state/events.action';
import { EventState } from './state/events.state';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  animations: [fadeInOut]
})
export class EventsComponent implements OnInit, AfterViewChecked {
  @ViewChildren(EventCardComponent) eventCards!: QueryList<EventCardComponent>;

  public events$: Observable<FilmEvent[]> = this.store.select(EventState.filteredEvents);

  public shoppingCart$: Observable<ShoppingCart> = this.store.select(EventState.shoppingCart);

  public shoppingCartAmount$: Observable<number> = this.shoppingCart$.pipe(
    map((shoppingCart: ShoppingCart) => {
      return shoppingCart && shoppingCart.events ? shoppingCart.events.length : 0;
    })
  );

  public firstVisibleDate$ = new BehaviorSubject<Date | undefined>(undefined);

  constructor(private store: Store, private dialog: MatDialog, private toast: ToastrService, private destroy: DestroyRef) {}

  public ngOnInit(): void {
    this.store.dispatch(new LoadEvents());
  }

  public ngAfterViewChecked(): void {
    setTimeout(() => {
      if (!this.firstVisibleDate$.value) this.updateFirstVisibleDate();
    });
  }

  public addToCart(event: FilmEvent): void {
    this.toast.success('Event added to shopping cart');
    this.store.dispatch(new AddEventToCart(event));
  }

  public openShoppingCartDialog(): void {
    this.dialog.open(ShoppingCartModalComponent, {
      width: '80%',
      height: '80%',
      data: this.shoppingCart$
    });
  }

  public openMaps(event: FilmEvent) {
    window.open(event.venue.direction, '_blank');
  }

  public getTooltipText(): string {
    return `Left click: add to shopping cart
    Right click: open venue in maps`;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.updateFirstVisibleDate();
  }

  private updateFirstVisibleDate(): void {
    const firstVisibleEventCard = this.eventCards.find(eventCard => this.isElementVisible(eventCard.elementRef.nativeElement));

    if (firstVisibleEventCard) {
      const date = new Date(firstVisibleEventCard.event.startTime);
      this.firstVisibleDate$.next(date);
    }
  }

  private isElementVisible(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth;
  }
}
