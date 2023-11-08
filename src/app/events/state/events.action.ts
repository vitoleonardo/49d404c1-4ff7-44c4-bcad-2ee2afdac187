import { FilmEvent } from '../models/film-event.interface';

export class LoadEvents {
  static readonly type = '[Events] Load Events';
}

export class EventsLoaded {
  static readonly type = '[Events] Events Loaded';
  constructor(public events: FilmEvent[]) {}
}

export class SearchEvents {
  static readonly type = '[Events] Search';
  constructor(public query: string) {}
}

export class AddEventToCart {
  static readonly type = '[Events] Add Event To Cart';
  constructor(public event: FilmEvent) {}
}

export class RemoveEventFromCart {
  static readonly type = '[Events] Remove Event From Cart';
  constructor(public eventId: string) {}
}

export class ClearCart {
  static readonly type = '[Events] Clear Cart';
}

export class LoadCart {
  static readonly type = '[Events] Load Cart';
}
