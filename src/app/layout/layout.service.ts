import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  navItems = [
    {
      label: $localize`Dashboard`,
      path: 'dashboard',
      icon: 'dashboard',
      roles: ['admin', 'manager'],
    },
    {
      label: $localize`Invoices`,
      path: 'invoice',
      icon: 'receipt',
      roles: ['admin', 'manager', 'user'],
    },
    {
      label: $localize`Products`,
      path: 'products',
      icon: 'category',
      roles: ['admin', 'manager'],
    },
    {
      label: $localize`Supplies`,
      path: 'supplies',
      icon: 'inventory_2',
      roles: ['admin', 'manager'],
    },
    {
      label: $localize`Users`,
      path: 'manage-users',
      icon: 'people',
      roles: ['admin'],
    },
    {
      label: $localize`Shifts`,
      path: 'shifts',
      icon: 'schedule',
      roles: ['admin', 'manager'],
    },
    {
      label: $localize`Categories`,
      path: 'categories',
      icon: 'category',
      roles: ['admin', 'manager'],
    },
  ];
}
