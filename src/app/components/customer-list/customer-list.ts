import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CustomerService } from '../../services/customer.service';

import { Customer } from '../../models/customer.model';

import { CreateCustomerComponent }
from '../create-customer/create-customer';

@Component({
  selector: 'app-customer-list',
  standalone: true,

  imports: [
    CommonModule,
    CreateCustomerComponent
  ],

  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css'
})
export class CustomerListComponent
  implements OnInit, OnDestroy {

  customers: Customer[] = [];

  showCreateForm: boolean = false;

  selectedCustomer: Customer | null = null;

  private destroy$ =
    new Subject<void>();

  constructor(
    private customerService: CustomerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadCustomers();

  }

  loadCustomers(): void {

    this.customerService
      .getCustomers()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({

        next: (
          data: Customer[]
        ) => {

          console.log(
            'Customers Loaded:',
            data
          );

          this.customers = data;

          this.cdr.detectChanges();

        },

        error: (err: any) => {

          console.error(
            'Error loading customers:',
            err
          );

        }

      });

  }

  toggleCreateForm(): void {

    this.showCreateForm =
      !this.showCreateForm;

    if (
      !this.showCreateForm
    ) {

      this.selectedCustomer =
        null;

    }

  }

  editCustomer(
    customer: Customer
  ): void {

    this.selectedCustomer =
      customer;

    this.showCreateForm = true;

  }

  onCustomerSaved(): void {

    this.loadCustomers();

    this.showCreateForm = false;

    this.selectedCustomer = null;

  }

  deleteCustomer(
    id: number
  ): void {

    const confirmDelete =
      confirm(
        'Are you sure you want to delete this customer?'
      );

    if (!confirmDelete) {

      return;

    }

    this.customerService
      .deleteCustomer(id)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({

        next: () => {

          alert(
            'Customer Deleted Successfully'
          );

          this.customers =
            this.customers.filter(
              customer => customer.id !== id
            );

          this.cdr.detectChanges();

        },

        error: (err: any) => {

          console.error(
            'Error deleting customer:',
            err
          );

        }

      });

  }

  ngOnDestroy(): void {

    this.destroy$.next();

    this.destroy$.complete();

  }

}