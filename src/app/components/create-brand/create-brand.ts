import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BrandService } from '../../services/brand.service';

import { CreateBrand } from '../../models/create-brand.model';

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

    // UPDATE MODE
    if (this.brand.id && this.brand.id > 0) {

      this.brandService.updateBrand(this.brand).subscribe({
        next: (response) => {
          console.log(response);
          alert('Brand Updated Successfully');
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
        },
        error: (err: any) => {
          console.error(err);
        }
      });

    }

  }

}