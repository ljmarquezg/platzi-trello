import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CustomValidators } from '@utils/validators';
import { BtnComponent } from "@shared/btn/btn.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '@services/auth.service';
import { RequestResponse, RequestStatus } from '@models/request-status.model';
import { query } from 'express';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule,
    BtnComponent
],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  private authService: AuthService = inject(AuthService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  formUser = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });
  statusUser: RequestStatus = 'init';

  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [ CustomValidators.MatchValidator('password', 'confirmPassword') ]
  });
  status: RequestStatus = 'init';
  showRegister: boolean = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  errorMessage: string = '';

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      this.authService.registerAndLogin(name, email, password).subscribe({
        next: () => {
            this.router.navigate(['/app/boards']);
        },
        error: (error: RequestResponse) => {
          this.status = 'failed';
          if(error.error.name === 'QueryFailedError') {
            this.errorMessage = 'Email already exists';
          } else {
            this.errorMessage = error.error.message;
          }
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  validate() {
    if(this.formUser.valid){
      const {email} =  this.formUser.getRawValue();
      this.authService.isAvailable(email).subscribe({
        next: (response) => {
          if(response.isAvailable) {
            this.showRegister = true;
            this.form.patchValue({email});
          } else {
            this.router.navigate(['/login'], {
              queryParams: {email}
            });
          }
      }, error: (error) => {

      }
    });
    } else {
      this.formUser.markAllAsTouched();
    }
  }
}
