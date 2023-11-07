import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FilmEvent } from './events/models/film-event.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Events-app';
  public events: FilmEvent[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<FilmEvent[]>('https://teclead-ventures.github.io/data/london-events.json').subscribe({
      next: data => {
        this.events = data
          .map(item => {
            return { ...item } as FilmEvent;
          })
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      },
      error: error => {
        console.error('Error loading events:', error);
      },
      complete: () => {
        console.info('Event loading completed');
      }
    });
  }
}
