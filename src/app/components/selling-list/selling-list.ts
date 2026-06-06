import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SellingService } from '../../services/selling.service';

import { Selling } from '../../models/selling.model';

import { CreateSellingComponent }
from '../create-selling/create-selling';

@Component({
  selector: 'app-selling-list',
  standalone: true,

  imports: [
    CommonModule,
    CreateSellingComponent
  ],

  templateUrl: './selling-list.html',
  styleUrl: './selling-list.css'
})
export class SellingListComponent
  implements OnInit, OnDestroy {

  sales: Selling[] = [];

  showCreateForm: boolean = false;

  private destroy$ =
    new Subject<void>();

  constructor(
    private sellingService: SellingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadSales();

  }

  loadSales(): void {

    this.sellingService
      .getSales()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({

        next: (
          data: Selling[]
        ) => {

          console.log(
            'Sales Loaded:',
            data
          );

          this.sales = data;

          this.cdr.detectChanges();

        },

        error: (err: any) => {

          console.error(
            'Error loading sales:',
            err
          );

        }

      });

  }

  toggleCreateForm(): void {

    this.showCreateForm =
      !this.showCreateForm;

  }

  onSaleSaved(): void {

    this.loadSales();

    this.showCreateForm = false;

  }

  ngOnDestroy(): void {

    this.destroy$.next();

    this.destroy$.complete();

  }

}