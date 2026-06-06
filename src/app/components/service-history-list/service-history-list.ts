import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ServiceHistoryService }
from '../../services/service-history.service';

import { ServiceHistory }
from '../../models/service-history.model';

import { CreateServiceHistoryComponent }
from '../create-service-history/create-service-history';

@Component({
  selector: 'app-service-history-list',
  standalone: true,

  imports: [
    CommonModule,
    CreateServiceHistoryComponent
  ],

  templateUrl: './service-history-list.html',
  styleUrl: './service-history-list.css'
})
export class ServiceHistoryListComponent
  implements OnInit, OnDestroy {

  services: ServiceHistory[] = [];

  showCreateForm: boolean = false;

  private destroy$ =
    new Subject<void>();

  constructor(
    private serviceHistoryService: ServiceHistoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadServices();

  }

  loadServices(): void {

    this.serviceHistoryService
      .getServices()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({

        next: (
          data: ServiceHistory[]
        ) => {

          console.log(
            'Service Records Loaded:',
            data
          );

          this.services = data;

          this.cdr.detectChanges();

        },

        error: (err: any) => {

          console.error(
            'Error loading services:',
            err
          );

        }

      });

  }

  toggleCreateForm(): void {

    this.showCreateForm =
      !this.showCreateForm;

  }

  onServiceSaved(): void {

    this.loadServices();

    this.showCreateForm = false;

  }

  ngOnDestroy(): void {

    this.destroy$.next();

    this.destroy$.complete();

  }

}