import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { InsuranceService } from '../../services/insurance.service';

import { Insurance } from '../../models/insurance.model';

import { CreateInsuranceComponent }
from '../create-insurance/create-insurance';

@Component({
  selector: 'app-insurance-list',
  standalone: true,

  imports: [
    CommonModule,
    CreateInsuranceComponent
  ],

  templateUrl: './insurance-list.html',
  styleUrl: './insurance-list.css'
})
export class InsuranceListComponent
  implements OnInit, OnDestroy {

  insurances: Insurance[] = [];

  showCreateForm: boolean = false;

  private destroy$ =
    new Subject<void>();

  constructor(
    private insuranceService: InsuranceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadInsurances();

  }

  loadInsurances(): void {

    this.insuranceService
      .getInsurances()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({

        next: (
          data: Insurance[]
        ) => {

          console.log(
            'Insurances Loaded:',
            data
          );

          this.insurances = data;

          this.cdr.detectChanges();

        },

        error: (err: any) => {

          console.error(
            'Error loading insurances:',
            err
          );

        }

      });

  }

  toggleCreateForm(): void {

    this.showCreateForm =
      !this.showCreateForm;

  }

  onInsuranceSaved(): void {

    this.loadInsurances();

    this.showCreateForm = false;

  }

  ngOnDestroy(): void {

    this.destroy$.next();

    this.destroy$.complete();

  }

}