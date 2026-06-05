import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InventoryService } from '../../services/inventory.service';
import { CarModelService } from '../../services/car-model.service';

import { Inventory } from '../../models/inventory.model';
import { CarModel } from '../../models/car-model.model';

@Component({
  selector: 'app-create-inventory',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-inventory.html',
  styleUrl: './create-inventory.css'
})
export class CreateInventoryComponent
  implements OnInit, OnChanges {

  @Input() selectedInventory: any;

  @Output() inventorySaved =
    new EventEmitter<void>();

  carModels: CarModel[] = [];

  inventory: any = {
    id: 0,
    carModelId: 0,
    quantityInStock: 0
  };

  // VALIDATION MESSAGES

  carModelError: string = '';

  quantityError: string = '';

  constructor(
    private inventoryService: InventoryService,
    private carModelService: CarModelService
  ) {}

  ngOnInit(): void {

    this.loadCarModels();

  }

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (
      changes['selectedInventory']
      &&
      this.selectedInventory
    ) {

      this.inventory = {

        id:
          this.selectedInventory.id,

        carModelId:
          this.selectedInventory.carModelId,

        quantityInStock:
          this.selectedInventory.quantityInStock

      };

    }

  }

  loadCarModels(): void {

    this.carModelService
      .getModels()
      .subscribe({

        next: (
          data: CarModel[]
        ) => {

          this.carModels = data;

        },

        error: (err: any) => {

          console.error(err);

        }

      });

  }

  onSubmit(): void {

    // CLEAR ERRORS

    this.carModelError = '';

    this.quantityError = '';

    // VALIDATION

    if (
      this.inventory.carModelId <= 0
    ) {

      this.carModelError =
        'Please select a Car Model';

      return;

    }

    if (
      this.inventory.quantityInStock < 0
    ) {

      this.quantityError =
        'Quantity cannot be negative';

      return;

    }

    // UPDATE

    if (
      this.inventory.id > 0
    ) {

      this.inventoryService
        .updateInventory(
          this.inventory
        )
        .subscribe({

          next: () => {

            alert(
              'Inventory Updated Successfully'
            );

            this.inventorySaved.emit();

          },

          error: (err: any) => {

            console.error(err);

          }

        });

    }

    // CREATE

    else {

      this.inventoryService
        .createInventory(
          this.inventory
        )
        .subscribe({

          next: () => {

            alert(
              'Inventory Created Successfully'
            );

            this.inventory = {

              id: 0,

              carModelId: 0,

              quantityInStock: 0

            };

            this.inventorySaved.emit();

          },

          error: (err: any) => {

            console.error(err);

          }

        });

    }

  }

}