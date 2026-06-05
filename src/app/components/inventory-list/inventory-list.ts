import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { InventoryService } from '../../services/inventory.service';

import { Inventory } from '../../models/inventory.model';

import { CreateInventoryComponent }
from '../create-inventory/create-inventory';

@Component({
  selector: 'app-inventory-list',
  standalone: true,

  imports: [
    CommonModule,
    CreateInventoryComponent
  ],

  templateUrl: './inventory-list.html',
  styleUrl: './inventory-list.css'
})
export class InventoryListComponent
  implements OnInit, OnDestroy {

  inventory: Inventory[] = [];

  showCreateForm: boolean = false;

  selectedInventory: Inventory | null = null;

  private destroy$ =
    new Subject<void>();

  constructor(
    private inventoryService: InventoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadInventory();

  }

  loadInventory(): void {

    this.inventoryService
      .getInventory()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({

        next: (
          data: Inventory[]
        ) => {

          console.log(
            'Inventory Loaded:',
            data
          );

          this.inventory = data;

          this.cdr.detectChanges();

        },

        error: (err: any) => {

          console.error(
            'Error loading inventory:',
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

      this.selectedInventory =
        null;

    }

  }

  editInventory(
    inventory: Inventory
  ): void {

    this.selectedInventory =
      inventory;

    this.showCreateForm = true;

  }

  onInventorySaved(): void {

    this.loadInventory();

    this.showCreateForm = false;

    this.selectedInventory = null;

  }

  deleteInventory(
    id: number
  ): void {

    const confirmDelete =
      confirm(
        'Are you sure you want to delete this inventory record?'
      );

    if (!confirmDelete) {

      return;

    }

    this.inventoryService
      .deleteInventory(id)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({

        next: () => {

          alert(
            'Inventory Deleted Successfully'
          );

          this.inventory =
            this.inventory.filter(
              item => item.id !== id
            );

          this.cdr.detectChanges();

        },

        error: (err: any) => {

          console.error(
            'Error deleting inventory:',
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