import { Artist } from './artist.interface';
import { Pick } from './pick.interface';
import { Venue } from './venue.model';

export interface FilmEvent {
  _id: string;
  title: string;
  flyerFront: string;
  attending: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  contentUrl: string;
  venue: Venue;
  pick: Pick;
  artists: Artist[];
  city: string;
  country: string;
  private: boolean;
  __v: number;
}
