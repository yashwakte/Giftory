import { Injectable } from '@angular/core';
import { HomeSection } from '../models/home-section.model';

@Injectable({ providedIn: 'root' })
export class HomeDataService {
  getSections(): HomeSection[] {
    return [
      { title: 'Bestsellers', description: 'Top selling gifts' },
      { title: 'New Arrivals', description: 'Latest in store' },
    ];
  }
}
