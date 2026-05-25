import { Component } from '@angular/core';

import { BrandList } from './components/brand-list/brand-list';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    BrandList
  ],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}