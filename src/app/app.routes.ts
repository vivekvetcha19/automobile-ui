import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { BrandList } from './components/brand-list/brand-list';
import { CarModelListComponent } from './components/car-model-list/car-model-list';
import { InventoryListComponent } from './components/inventory-list/inventory-list';
import { CustomerListComponent } from './components/customer-list/customer-list';
import { SellingListComponent } from './components/selling-list/selling-list';
import { InsuranceListComponent } from './components/insurance-list/insurance-list';
import { ServiceHistoryListComponent } from './components/service-history-list/service-history-list';
import { AnalyticsDashboardComponent } from './components/analytics-dashboard/analytics-dashboard';

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
  },

  {
    path: 'sales',
    component: SellingListComponent
  },

  {
    path: 'insurance',
    component: InsuranceListComponent
  },

  {
    path: 'service-history',
    component: ServiceHistoryListComponent
  },

  {
    path:'analytics',
    component: AnalyticsDashboardComponent
  }


];