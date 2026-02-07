import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface ProfilePerk {
  title: string;
  copy: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  readonly perks: ProfilePerk[] = [
    {
      title: 'Order history',
      copy: 'Track every order, download invoices, and request support from one place.',
    },
    {
      title: 'Saved addresses',
      copy: 'Checkout in seconds with verified addresses and preferred delivery instructions.',
    },
    {
      title: 'Wishlist & gifting',
      copy: 'Save ideas, share with loved ones, and get personalised recommendations.',
    },
  ];
}
