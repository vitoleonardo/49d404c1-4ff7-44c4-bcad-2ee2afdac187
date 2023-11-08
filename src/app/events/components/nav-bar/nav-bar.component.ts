import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchEvents } from '../../state/events.action';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Input() public shoppingCartAmount$: Observable<number> | undefined;
  @Output() public onShoppingCartClicked: EventEmitter<void> = new EventEmitter<void>();

  public searchControl = new FormControl();

  constructor(private store: Store) {
    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(query => {
      this.store.dispatch(new SearchEvents(query));
    });
  }

  public clearSearch() {
    this.searchControl.setValue('');
  }
}
