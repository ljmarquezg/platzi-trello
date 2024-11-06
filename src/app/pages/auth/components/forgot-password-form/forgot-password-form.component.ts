import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BtnComponent } from "../../../../shared/btn/btn.component";
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BtnComponent
],
  templateUrl: './forgot-password-form.component.html'
})
export class ForgotPasswordFormComponent {

  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  
  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
  });
  status: string = 'init';
  emailSent = false;

  sendLink() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email } = this.form.getRawValue();
      this.authService.recovery(email).subscribe({
        next: ({token}) => {
          this.status = 'success';
          this.emailSent = true;
        },
        error: (error) => {
          this.status = 'failed';
          console.log(error);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

}
