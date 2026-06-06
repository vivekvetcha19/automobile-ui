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
import { ServiceHistoryService } from '../../services/service-history.service';

import { Customer } from '../../models/customer.model';
import { CarModel } from '../../models/car-model.model';

@Component({
  selector: 'app-create-service-history',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './create-service-history.html',
  styleUrl: './create-service-history.css'
})
export class CreateServiceHistoryComponent
  implements OnInit {

  @Output()
  serviceSaved =
    new EventEmitter<void>();

  customers: Customer[] = [];

  carModels: CarModel[] = [];

  service: any = {

    customerId: 0,

    carModelId: 0,

    serviceDescription: '',

    serviceCost: 0

  };

  customerError: string = '';

  carModelError: string = '';

  descriptionError: string = '';

  costError: string = '';

  constructor(
    private customerService: CustomerService,
    private carModelService: CarModelService,
    private serviceHistoryService: ServiceHistoryService
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

    this.descriptionError = '';

    this.costError = '';

    if (this.service.customerId <= 0) {

      this.customerError =
        'Please select a Customer';

      return;

    }

    if (this.service.carModelId <= 0) {

      this.carModelError =
        'Please select a Car Model';

      return;

    }

    if (
      !this.service.serviceDescription?.trim()
    ) {

      this.descriptionError =
        'Service Description is required';

      return;

    }

    if (
      this.service.serviceDescription.length > 500
    ) {

      this.descriptionError =
        'Maximum length is 500 characters';

      return;

    }

    if (
      this.service.serviceCost <= 0
    ) {

      this.costError =
        'Service Cost must be greater than 0';

      return;

    }

    this.serviceHistoryService
      .createService(this.service)
      .subscribe({

        next: () => {

          alert(
            'Service Record Created Successfully'
          );

          this.service = {

            customerId: 0,

            carModelId: 0,

            serviceDescription: '',

            serviceCost: 0

          };

          this.serviceSaved.emit();

        },

        error: (err) => {

          console.error(err);

          alert(
            'Invalid Customer or Car Model'
          );

        }

      });

  }

}