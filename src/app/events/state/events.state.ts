import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { produce } from 'immer';
import { EMPTY, catchError, switchMap } from 'rxjs';
import { FilmEvent } from '../models/film-event.interface';
import { ShoppingCart } from '../models/shopping-cart.interface';
import { AddEventToCart, EventsLoaded, LoadEvents, RemoveEventFromCart, SearchEvents } from './events.action';

export interface EventStateModel {
  events: FilmEvent[];
  searchString: string;
  eventsLoading: boolean;
  cart: ShoppingCart;
}

@State<EventStateModel>({
  name: 'EventState',
  defaults: {
    events: [],
    searchString: '',
    eventsLoading: false,
    cart: {
      id: '',
      events: []
    }
  }
})
@Injectable()
export class EventState {
  constructor(private httpClient: HttpClient) {}

  @Selector()
  public static events(state: EventStateModel): FilmEvent[] {
    return state.events;
  }

  @Selector()
  public static shoppingCart(state: EventStateModel): ShoppingCart {
    return state.cart;
  }

  @Selector()
  static filteredEvents(state: EventStateModel) {
    if (!state.searchString) {
      return state.events;
    }
    return state.events.filter(event => event.title.toLowerCase().includes(state.searchString.toLowerCase()));
  }

  @Action(SearchEvents)
  public updateFilter(ctx: StateContext<EventStateModel>, action: SearchEvents) {
    ctx.patchState({ searchString: action.query });
  }

  @Action(LoadEvents)
  public loadEvents(ctx: StateContext<EventStateModel>) {
    ctx.patchState({ eventsLoading: true });

    return this.httpClient.get<FilmEvent[]>('https://teclead-ventures.github.io/data/london-events.json').pipe(
      switchMap(events => {
        return ctx.dispatch(new EventsLoaded(events as FilmEvent[]));
      }),
      catchError(error => {
        console.error('Error loading events:', error);
        return EMPTY;
      })
    );
  }

  @Action(EventsLoaded)
  public eventsLoaded(ctx: StateContext<EventStateModel>, action: EventsLoaded) {
    const sortedEvents = action.events
      .map(item => {
        return { ...item } as FilmEvent;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    ctx.setState(
      produce(ctx.getState(), state => {
        state.events = sortedEvents;
        state.eventsLoading = false;
      })
    );
  }

  @Action(AddEventToCart)
  public addEventToCart(ctx: StateContext<EventStateModel>, action: AddEventToCart) {
    const event = action.event;
    ctx.setState(
      produce(ctx.getState(), state => {
        state.cart.events.push(event);
        state.events = state.events.filter(item => item._id !== event._id);
      })
    );
  }

  @Action(RemoveEventFromCart)
  public removeEventFromCart(ctx: StateContext<EventStateModel>, action: RemoveEventFromCart) {
    const eventId = action.eventId;
    ctx.setState(
      produce(ctx.getState(), state => {
        const event = state.cart.events.find(item => item._id === eventId);
        if (event) {
          state.cart.events = state.cart.events.filter(item => item._id !== eventId);
          state.events.push(event);
          state.events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        }
      })
    );
  }
}
