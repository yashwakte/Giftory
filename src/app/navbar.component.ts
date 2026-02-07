import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  showMobileNav = false;
  activeDropdown: string | null = null;

  anniversaryLinks = [
    { label: 'Anniversary Gifts for Husband', route: '/category/anniversary' },
    { label: 'Anniversary Gifts for Wife', route: '/category/anniversary' },
    { label: 'Anniversary Gifts for Parents', route: '/category/anniversary' },
    { label: 'Anniversary Gifts for Boyfriend', route: '/category/anniversary' },
    { label: 'Anniversary Gifts for Girlfriend', route: '/category/anniversary' },
    { label: 'Anniversary Gifts for Couples', route: '/category/anniversary' },
    { label: 'Customized Anniversary Gifts', route: '/category/personalized' },
    { label: 'Naughty Anniversary Gifts', route: '/category/anniversary' },
    { label: 'Long Distance Anniversary Gifts', route: '/category/anniversary' },
  ];

  birthdayLinks = [
    { label: 'Birthday Gifts for Wife', route: '/category/birthday' },
    { label: 'Birthday Gifts for Husband', route: '/category/birthday' },
    { label: 'Birthday Gifts for Boyfriend', route: '/category/birthday' },
    { label: 'Birthday Gifts for Girlfriend', route: '/category/birthday' },
    { label: 'Birthday Gifts for Him', route: '/category/for-him' },
    { label: 'Birthday Gifts for Her', route: '/category/for-her' },
    { label: 'Customised Birthday Gifts', route: '/category/personalized' },
    { label: 'Birthday Gift Hampers', route: '/category/birthday' },
    { label: 'Best Selling Birthday Gifts', route: '/category/birthday' },
  ];

  occasionLinks = [
    { label: "Valentine's Day", route: '/shop' },
    { label: 'Birthday', route: '/category/birthday' },
    { label: 'Anniversary', route: '/category/anniversary' },
    { label: 'Wedding', route: '/shop' },
    { label: 'Honeymoon', route: '/shop' },
    { label: 'Housewarming', route: '/shop' },
    { label: 'Diwali', route: '/shop' },
    { label: 'Rakhi', route: '/shop' },
    { label: 'Christmas', route: '/shop' },
    { label: "Mother's Day", route: '/shop' },
    { label: "Father's Day", route: '/shop' },
    { label: 'Friendship Day', route: '/shop' },
    { label: "Teacher's Day", route: '/shop' },
  ];

  relationshipLinks = [
    { label: 'Husband', route: '/category/for-him' },
    { label: 'Wife', route: '/category/for-her' },
    { label: 'Boyfriend', route: '/category/for-him' },
    { label: 'Girlfriend', route: '/category/for-her' },
    { label: 'Brother', route: '/category/for-him' },
    { label: 'Sister', route: '/category/for-her' },
    { label: 'Mother', route: '/category/for-her' },
    { label: 'Father', route: '/category/for-him' },
    { label: 'Friends', route: '/shop' },
    { label: 'Son', route: '/category/for-him' },
    { label: 'Daughter', route: '/category/for-her' },
    { label: 'New Mom', route: '/category/for-her' },
    { label: 'New Dad', route: '/category/for-him' },
    { label: 'Grandparents', route: '/shop' },
  ];

  toggleDropdown(menu: string): void {
    this.activeDropdown = this.activeDropdown === menu ? null : menu;
  }

  closeDropdown(): void {
    this.activeDropdown = null;
  }

  closeMobileNav(): void {
    this.showMobileNav = false;
    this.activeDropdown = null;
  }
}
