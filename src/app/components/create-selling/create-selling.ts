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
import { SellingService } from '../../services/selling.service';

import { Customer } from '../../models/customer.model';
import { CarModel } from '../../models/car-model.model';

@Component({
  selector: 'app-create-selling',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './create-selling.html',
  styleUrl: './create-selling.css'
})
export class CreateSellingComponent
  implements OnInit {

  @Output()
  saleSaved = new EventEmitter<void>();

  customers: Customer[] = [];

  carModels: CarModel[] = [];

  sale: any = {

    customerId: 0,

    carModelId: 0,

    quantitySold: 1,

    sellingPrice: 0

  };

  customerError: string = '';

  carModelError: string = '';

  quantityError: string = '';

  priceError: string = '';

  constructor(
    private customerService: CustomerService,
    private carModelService: CarModelService,
    private sellingService: SellingService
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

    this.quantityError = '';

    this.priceError = '';

    if (this.sale.customerId <= 0) {

      this.customerError =
        'Please select a Customer';

      return;

    }

    if (this.sale.carModelId <= 0) {

      this.carModelError =
        'Please select a Car Model';

      return;

    }

    if (this.sale.quantitySold < 1) {

      this.quantityError =
        'Quantity must be at least 1';

      return;

    }

    if (this.sale.sellingPrice <= 0) {

      this.priceError =
        'Selling Price must be greater than 0';

      return;

    }

    this.sellingService
      .createSale(this.sale)
      .subscribe({

        next: () => {

          alert(
            'Sale Created Successfully'
          );

          this.sale = {

            customerId: 0,

            carModelId: 0,

            quantitySold: 1,

            sellingPrice: 0

          };

          this.saleSaved.emit();

        },

        error: (err) => {

          console.error(err);

          alert(
            'Invalid sale. Check stock availability.'
          );

        }

      });

  }

}