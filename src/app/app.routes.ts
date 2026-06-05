import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { BrandList } from './components/brand-list/brand-list';
import { CarModelListComponent } from './components/car-model-list/car-model-list';
import { InventoryListComponent } from './components/inventory-list/inventory-list';
import { CustomerListComponent } from './components/customer-list/customer-list';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'brands',
    component: BrandList
  },

  {
  path: 'models',
  component: CarModelListComponent
  },

  {
    path: 'inventory',
    component: InventoryListComponent
  },

  {
     path: 'customers',
     component: CustomerListComponent
  }


];