import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BrandService } from '../../services/brand.service';
import { CarModelService } from '../../services/car-model.service';

import { Brand } from '../../models/brand.model';

@Component({
  selector: 'app-create-car-model',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-car-model.html',
  styleUrl: './create-car-model.css'
})
export class CreateCarModelComponent
  implements OnInit, OnChanges {

  @Input() selectedModel: any;

  @Output() modelSaved = new EventEmitter<void>();

  brands: Brand[] = [];

  // VALIDATION MESSAGES

  nameError: string = '';

  priceError: string = '';

  brandError: string = '';

  model: any = {
    id: 0,
    name: '',
    price: 0,
    brandId: 0
  };

  constructor(
    private brandService: BrandService,
    private carModelService: CarModelService
  ) {}

  ngOnInit(): void {

    this.loadBrands();

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['selectedModel'] &&
      this.selectedModel
    ) {

      this.model = {
        id: this.selectedModel.id,
        name: this.selectedModel.name,
        price: this.selectedModel.price,
        brandId: this.selectedModel.brandId
      };

    }

  }

  loadBrands(): void {

    this.brandService.getBrands().subscribe({

      next: (data: Brand[]) => {

        this.brands = data;

      },

      error: (err: any) => {

        console.error(err);

      }

    });

  }

  onSubmit(): void {

    // CLEAR OLD ERRORS

    this.nameError = '';

    this.priceError = '';

    this.brandError = '';

    // NAME VALIDATION

    if (!this.model.name?.trim()) {

      this.nameError =
        'Model Name is required';

      return;

    }

    if (this.model.name.length > 100) {

      this.nameError =
        'Maximum length is 100 characters';

      return;

    }

    // PRICE VALIDATION

    if (this.model.price <= 0) {

      this.priceError =
        'Price must be greater than 0';

      return;

    }

    // BRAND VALIDATION

    if (this.model.brandId <= 0) {

      this.brandError =
        'Please select a Brand';

      return;

    }

    // UPDATE

    if (
      this.model.id &&
      this.model.id > 0
    ) {

      this.carModelService
        .updateModel(this.model)
        .subscribe({

          next: () => {

            alert(
              'Car Model Updated Successfully'
            );

            this.modelSaved.emit();

          },

          error: (err: any) => {

            console.error(err);

          }

        });

    }

    // CREATE

    else {

      this.carModelService
        .createModel(this.model)
        .subscribe({

          next: () => {

            alert(
              'Car Model Created Successfully'
            );

            this.model = {

              id: 0,
              name: '',
              price: 0,
              brandId: 0

            };

            this.modelSaved.emit();

          },

          error: (err: any) => {

            console.error(err);

          }

        });

    }

  }

}