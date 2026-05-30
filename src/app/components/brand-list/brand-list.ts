import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
export class BrandList implements OnInit, OnDestroy {

  brands: Brand[] = [];
  showCreateForm: boolean = false;
  selectedBrand: Brand | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private brandService: BrandService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadBrands();
      });

    this.loadBrands();
  }

  loadBrands(): void {
    this.brandService.getBrands()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Brand[]) => {
          this.brands = data;
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          console.error('Error loading brands:', err);
        }
      });
  }

  onBrandSaved(): void {
    this.loadBrands();
    this.showCreateForm = false;
    this.selectedBrand = null;
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
    if (!this.showCreateForm) {
      this.selectedBrand = null;
    }
  }

  editBrand(brand: Brand): void {
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

    this.brandService.deleteBrand(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          alert('Brand Deleted Successfully');
          this.brands = this.brands.filter(brand => brand.id !== id);
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          console.error('Error deleting brand:', err);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}