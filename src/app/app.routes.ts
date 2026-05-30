import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { BrandList } from './components/brand-list/brand-list';
import { CarModelListComponent } from './components/car-model-list/car-model-list';

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
  }

];