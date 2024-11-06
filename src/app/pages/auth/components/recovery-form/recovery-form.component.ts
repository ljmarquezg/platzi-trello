import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { CustomValidators } from '@utils/validators';
import { BtnComponent } from "@shared/btn/btn.component";
import { AuthService } from '@services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestResponse, RequestStatus } from '@models/request-status.model';
import { cp } from 'fs';

@Component({
  selector: 'app-recovery-form',
  standalone: true,
  imports: [
    FontAwesomeModule,
    ReactiveFormsModule,
    BtnComponent
],
  templateUrl: './recovery-form.component.html',
})
export class RecoveryFormComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  form = this.formBuilder.nonNullable.group(
    {
      newPassword: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('newPassword', 'confirmPassword'),
      ],
    }
  );
  status: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword:boolean = false;
  token:string = '';
  errorMessage: string = '';

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(this.token);
      const token = params['token'];
      if (token) {
        this.token = token;
      } else {
        this.status = 'failed';
        this.router.navigate(['/login']);
      }
    });
  }
  
  recovery() {
    if (this.form.valid) {
      this.status = 'loading';
      const { newPassword } = this.form.getRawValue();
      this.authService.changePassword(this.token, newPassword).subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/login']);
        },
        error: (response: RequestResponse) => {
          this.status = 'failed';
          this.errorMessage = response.error.message;
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
