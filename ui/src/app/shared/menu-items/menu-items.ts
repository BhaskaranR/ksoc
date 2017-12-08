import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}


const MENUITEMS = [
  {
    name: 'Home',
    icon: 'home',
    type: 'link',
    state: 'home'
  },
  {
    name: 'People',
    icon: 'people',
    type: 'link',
    state: 'people'
  },
  {
    name: 'Trending',
    icon: 'whatshot',
    type: 'link',
    state: 'trending'
  },
  {
    name: 'Profile',
    icon: 'account_circle',
    type: 'linkwithid',
    state: 'profile'
  },
  {
    name: 'Marketplace',
    icon: 'shopping_basket',
    type: 'link',
    state: 'markets'
  },
  {
    name: 'Settings',
    icon: 'settings',
    type: 'link',
    state: 'settings'
  },
  {
    state: 'chat',
    icon: 'chat',
    type: 'link',
    name: 'Chat'
  },
  {
    name: 'Business',
    icon: 'business',
    type: 'link',
    state: 'business'
  },
  {
    name: 'Feedback',
    icon: 'feedback',
    type: 'link',
    state: 'feedback'
  },
  {
    name: 'Help',
    icon: 'help',
    type: 'link',
    state: 'help'
  }
];


@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
