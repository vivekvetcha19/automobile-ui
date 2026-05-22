import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandService } from './services/brand.service';
import { Brand } from './models/brand.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  brands: Brand[] = [];

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {

    this.brandService.getBrands().subscribe({
      next: (data: Brand[]) => {
        console.log(data);
        this.brands = data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });

  }
}