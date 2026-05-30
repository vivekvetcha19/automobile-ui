import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
export class CarModelListComponent implements OnInit {

  models: CarModel[] = [];

  showCreateForm: boolean = false;

  selectedModel: CarModel | null = null;

  constructor(
    private carModelService: CarModelService
  ) {}

  ngOnInit(): void {

    this.loadModels();

  }

  loadModels(): void {

    this.carModelService.getModels().subscribe({

      next: (data: CarModel[]) => {

        console.log(data);

        this.models = data;

      },

      error: (err: any) => {

        console.error(err);

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
      .subscribe({

        next: () => {

          alert(
            'Car Model Deleted Successfully'
          );

          this.models = this.models.filter(
            model => model.id !== id
          );

        },

        error: (err: any) => {

          console.error(err);

        }

      });

  }

}