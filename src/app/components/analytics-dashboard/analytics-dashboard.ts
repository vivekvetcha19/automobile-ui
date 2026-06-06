import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AnalyticsService }
from '../../services/analytics.service';

import { Revenue }
from '../../models/revenue.model';

import { SalesByBrand }
from '../../models/sales-by-brand.model';

import { TopSellingModel }
from '../../models/top-selling-model.model';

import { LowStock }
from '../../models/low-stock.model';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './analytics-dashboard.html',
  styleUrl: './analytics-dashboard.css'
})
export class AnalyticsDashboardComponent
  implements OnInit, OnDestroy {

  revenue: Revenue = {
    totalRevenue: 0
  };

  salesByBrand: SalesByBrand[] = [];

  topModels: TopSellingModel[] = [];

  lowStock: LowStock[] = [];

  private destroy$ =
    new Subject<void>();

  constructor(
    private analyticsService: AnalyticsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadAnalytics();

  }

  loadAnalytics(): void {

    this.analyticsService
      .getTotalRevenue()
      .pipe(takeUntil(this.destroy$))
      .subscribe({

        next: (data) => {

          this.revenue = data;

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error(err);

        }

      });

    this.analyticsService
      .getSalesByBrand()
      .pipe(takeUntil(this.destroy$))
      .subscribe({

        next: (data) => {

          this.salesByBrand = data;

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error(err);

        }

      });

    this.analyticsService
      .getTopModels()
      .pipe(takeUntil(this.destroy$))
      .subscribe({

        next: (data) => {

          this.topModels = data;

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error(err);

        }

      });

    this.analyticsService
      .getLowStock()
      .pipe(takeUntil(this.destroy$))
      .subscribe({

        next: (data) => {

          this.lowStock = data;

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  ngOnDestroy(): void {

    this.destroy$.next();

    this.destroy$.complete();

  }

}