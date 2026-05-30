import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-create-brand',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-brand.html',
  styleUrl: './create-brand.css'
})
export class CreateBrandComponent implements OnChanges {

  // RECEIVE DATA FROM PARENT
  @Input() selectedBrand: any;

  // SEND EVENT TO PARENT
  @Output() brandSaved = new EventEmitter<void>();

  brand: any = {
    id: 0,
    name: '',
    country: ''
  };

  constructor(private brandService: BrandService) {}

  // RUNS WHEN INPUT DATA CHANGES
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['selectedBrand'] && this.selectedBrand) {

      this.brand = {
        id: this.selectedBrand.id,
        name: this.selectedBrand.name,
        country: this.selectedBrand.country
      };

    }

  }

  onSubmit(): void {

    // REQUIRED FIELD VALIDATION
    if (
      !this.brand.name?.trim() ||
      !this.brand.country?.trim()
    ) {
      alert('Name and Country are required');
      return;
    }

    // MAX LENGTH VALIDATION
    if (
      this.brand.name.length > 100 ||
      this.brand.country.length > 100
    ) {
      alert('Maximum length is 100 characters');
      return;
    }

    // UPDATE MODE
    if (this.brand.id && this.brand.id > 0) {

      this.brandService.updateBrand(this.brand).subscribe({
        next: (response) => {

          console.log(response);

          alert('Brand Updated Successfully');

          // NOTIFY PARENT
          this.brandSaved.emit();

        },
        error: (err: any) => {
          console.error(err);
        }
      });

    }

    // CREATE MODE
    else {

      this.brandService.createBrand(this.brand).subscribe({
        next: (response) => {

          console.log(response);

          alert('Brand Created Successfully');

          // CLEAR FORM
          this.brand = {
            id: 0,
            name: '',
            country: ''
          };

          // NOTIFY PARENT
          this.brandSaved.emit();

        },
        error: (err: any) => {
          console.error(err);
        }
      });

    }

  }

}