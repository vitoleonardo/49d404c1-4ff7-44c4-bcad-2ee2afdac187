import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { fadeInOut } from 'src/app/shared/animations';
import { ShoppingCart } from '../../models/shopping-cart.interface';
import { RemoveEventFromCart } from '../../state/events.action';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
  animations: [fadeInOut]
})
export class ShoppingCartModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data$: Observable<ShoppingCart>, public store: Store) {}

  public removeFromCart(eventId: string): void {
    this.store.dispatch(new RemoveEventFromCart(eventId));
  }
}
