import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomerService } from '../../services/customer.service';
import { CarModelService } from '../../services/car-model.service';
import { InsuranceService } from '../../services/insurance.service';

import { Customer } from '../../models/customer.model';
import { CarModel } from '../../models/car-model.model';

@Component({
  selector: 'app-create-insurance',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './create-insurance.html',
  styleUrl: './create-insurance.css'
})
export class CreateInsuranceComponent
  implements OnInit {

  @Output()
  insuranceSaved =
    new EventEmitter<void>();

  customers: Customer[] = [];

  carModels: CarModel[] = [];

  insurance: any = {

    customerId: 0,

    carModelId: 0,

    policyNumber: '',

    providerName: '',

    coverageAmount: 0,

    startDate: '',

    expiryDate: ''

  };

  customerError: string = '';

  carModelError: string = '';

  policyError: string = '';

  providerError: string = '';

  coverageError: string = '';

  startDateError: string = '';

  expiryDateError: string = '';

  constructor(
    private customerService: CustomerService,
    private carModelService: CarModelService,
    private insuranceService: InsuranceService
  ) {}

  ngOnInit(): void {

    this.loadCustomers();

    this.loadCarModels();

  }

  loadCustomers(): void {

    this.customerService
      .getCustomers()
      .subscribe({

        next: (data) => {

          this.customers = data;

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  loadCarModels(): void {

    this.carModelService
      .getModels()
      .subscribe({

        next: (data) => {

          this.carModels = data;

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  onSubmit(): void {

    this.customerError = '';

    this.carModelError = '';

    this.policyError = '';

    this.providerError = '';

    this.coverageError = '';

    this.startDateError = '';

    this.expiryDateError = '';

    if (this.insurance.customerId <= 0) {

      this.customerError =
        'Please select a Customer';

      return;

    }

    if (this.insurance.carModelId <= 0) {

      this.carModelError =
        'Please select a Car Model';

      return;

    }

    if (!this.insurance.policyNumber?.trim()) {

      this.policyError =
        'Policy Number is required';

      return;

    }

    if (this.insurance.policyNumber.length > 100) {

      this.policyError =
        'Maximum length is 100 characters';

      return;

    }

    if (!this.insurance.providerName?.trim()) {

      this.providerError =
        'Provider Name is required';

      return;

    }

    if (this.insurance.providerName.length > 200) {

      this.providerError =
        'Maximum length is 200 characters';

      return;

    }

    if (this.insurance.coverageAmount <= 0) {

      this.coverageError =
        'Coverage Amount must be greater than 0';

      return;

    }

    if (!this.insurance.startDate) {

      this.startDateError =
        'Start Date is required';

      return;

    }

    if (!this.insurance.expiryDate) {

      this.expiryDateError =
        'Expiry Date is required';

      return;

    }

    if (
      new Date(this.insurance.expiryDate)
      <=
      new Date(this.insurance.startDate)
    ) {

      this.expiryDateError =
        'Expiry Date must be after Start Date';

      return;

    }

    this.insuranceService
      .createInsurance(this.insurance)
      .subscribe({

        next: () => {

          alert(
            'Insurance Created Successfully'
          );

          this.insurance = {

            customerId: 0,

            carModelId: 0,

            policyNumber: '',

            providerName: '',

            coverageAmount: 0,

            startDate: '',

            expiryDate: ''

          };

          this.insuranceSaved.emit();

        },

        error: (err) => {

          console.error(err);

          alert(
            'Invalid insurance data'
          );

        }

      });

  }

}