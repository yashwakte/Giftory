import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  userService = inject(UserService);

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      delivered: '#10b981',
      'in-transit': '#3b82f6',
      processing: '#f59e0b',
      cancelled: '#ef4444',
    };
    return colors[status] || '#6b7280';
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      delivered: 'Delivered',
      'in-transit': 'In Transit',
      processing: 'Processing',
      cancelled: 'Cancelled',
    };
    return labels[status] || status;
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date));
  }

  setDefaultAddress(id: string): void {
    this.userService.setDefaultAddress(id);
  }
}
