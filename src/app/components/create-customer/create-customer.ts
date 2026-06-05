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

import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-create-customer',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './create-customer.html',
  styleUrl: './create-customer.css'
})
export class CreateCustomerComponent
  implements OnChanges {

  @Input() selectedCustomer: any;

  @Output() customerSaved =
    new EventEmitter<void>();

  customer: any = {

    id: 0,

    firstName: '',

    lastName: '',

    email: '',

    phoneNumber: ''

  };

  // VALIDATION ERRORS

  firstNameError: string = '';

  lastNameError: string = '';

  emailError: string = '';

  phoneError: string = '';

  constructor(
    private customerService: CustomerService
  ) {}

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (
      changes['selectedCustomer']
      &&
      this.selectedCustomer
    ) {

      this.customer = {

        id: this.selectedCustomer.id,

        firstName:
          this.selectedCustomer.firstName,

        lastName:
          this.selectedCustomer.lastName,

        email:
          this.selectedCustomer.email,

        phoneNumber:
          this.selectedCustomer.phoneNumber

      };

    }

  }

  onSubmit(): void {

    // CLEAR ERRORS

    this.firstNameError = '';

    this.lastNameError = '';

    this.emailError = '';

    this.phoneError = '';

    // FIRST NAME

    if (
      !this.customer.firstName?.trim()
    ) {

      this.firstNameError =
        'First Name is required';

      return;

    }

    if (
      this.customer.firstName.length > 100
    ) {

      this.firstNameError =
        'Maximum length is 100 characters';

      return;

    }

    // LAST NAME

    if (
      !this.customer.lastName?.trim()
    ) {

      this.lastNameError =
        'Last Name is required';

      return;

    }

    if (
      this.customer.lastName.length > 100
    ) {

      this.lastNameError =
        'Maximum length is 100 characters';

      return;

    }

    // EMAIL

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !this.customer.email?.trim()
    ) {

      this.emailError =
        'Email is required';

      return;

    }

    if (
      !emailPattern.test(
        this.customer.email
      )
    ) {

      this.emailError =
        'Invalid email format';

      return;

    }

    // PHONE

    if (
      !this.customer.phoneNumber?.trim()
    ) {

      this.phoneError =
        'Phone Number is required';

      return;

    }

    if (
      this.customer.phoneNumber.length > 20
    ) {

      this.phoneError =
        'Maximum length is 20 characters';

      return;

    }

    // UPDATE

    if (
      this.customer.id > 0
    ) {

      this.customerService
        .updateCustomer(
          this.customer
        )
        .subscribe({

          next: () => {

            alert(
              'Customer Updated Successfully'
            );

            this.customerSaved.emit();

          },

          error: (err: any) => {

            console.error(err);

          }

        });

    }

    // CREATE

    else {

      this.customerService
        .createCustomer(
          this.customer
        )
        .subscribe({

          next: () => {

            alert(
              'Customer Created Successfully'
            );

            this.customer = {

              id: 0,

              firstName: '',

              lastName: '',

              email: '',

              phoneNumber: ''

            };

            this.customerSaved.emit();

          },

          error: (err: any) => {

            console.error(err);

          }

        });

    }

  }

}