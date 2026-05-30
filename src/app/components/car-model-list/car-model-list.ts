import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CarModelService } from '../../services/car-model.service';
import { CarModel } from '../../models/car-model.model';

import { CreateCarModelComponent } from '../create-car-model/create-car-model';

@Component({
  selector: 'app-car-model-list',
  standalone: true,

  imports: [
    CommonModule,
    CreateCarModelComponent
  ],

  templateUrl: './car-model-list.html',
  styleUrl: './car-model-list.css'
})
export class CarModelListComponent
  implements OnInit, OnDestroy {

  models: CarModel[] = [];

  showCreateForm: boolean = false;

  selectedModel: CarModel | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private carModelService: CarModelService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadModels();

  }

  loadModels(): void {

    this.carModelService.getModels()
      .pipe(takeUntil(this.destroy$))
      .subscribe({

        next: (data: CarModel[]) => {

          console.log('Models Loaded:', data);

          this.models = data;

          this.cdr.detectChanges();

        },

        error: (err: any) => {

          console.error(
            'Error loading models:',
            err
          );

        }

      });

  }

  toggleCreateForm(): void {

    this.showCreateForm = !this.showCreateForm;

    if (!this.showCreateForm) {

      this.selectedModel = null;

    }

  }

  editModel(model: CarModel): void {

    this.selectedModel = model;

    this.showCreateForm = true;

  }

  onModelSaved(): void {

    this.loadModels();

    this.showCreateForm = false;

    this.selectedModel = null;

  }

  deleteModel(id: number): void {

    const confirmDelete = confirm(
      'Are you sure you want to delete this model?'
    );

    if (!confirmDelete) {
      return;
    }

    this.carModelService.deleteModel(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({

        next: () => {

          alert(
            'Car Model Deleted Successfully'
          );

          this.models = this.models.filter(
            model => model.id !== id
          );

          this.cdr.detectChanges();

        },

        error: (err: any) => {

          console.error(
            'Error deleting model:',
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