import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandService } from '../../services/brand.service';
import { Brand } from '../../models/brand.model';

import { CreateBrandComponent } from '../create-brand/create-brand';

@Component({
  selector: 'app-brand-list',
  standalone: true,

  imports: [
    CommonModule,
    CreateBrandComponent
  ],

  templateUrl: './brand-list.html',
  styleUrl: './brand-list.css'
})
export class BrandList implements OnInit {

  brands: Brand[] = [];

  // SHOW/HIDE CREATE FORM
  showCreateForm: boolean = false;

  // STORE SELECTED BRAND
  selectedBrand: Brand | null = null;

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {

    console.log('ngOnInit executed');

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

  // TOGGLE CREATE FORM
  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
  }

  // EDIT BRAND
  editBrand(brand: Brand): void {

    console.log(brand);

    this.selectedBrand = brand;

    this.showCreateForm = true;

  }

  deleteBrand(id: number): void {

  const confirmDelete = confirm(
    'Are you sure you want to delete this brand?'
  );

  if (!confirmDelete) {
    return;
  }

  this.brandService.deleteBrand(id).subscribe({

    next: () => {

      alert('Brand Deleted Successfully');

      this.brands = this.brands.filter(
        brand => brand.id !== id
      );

    },

    error: (err: any) => {
      console.error(err);
    }

  });

  }

}