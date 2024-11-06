import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { BtnComponent } from "../../../../shared/btn/btn.component";
import { BackgroundComponent } from "../background/background.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { faEye, faEyeSlash, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService

 } from '@services/auth.service';
import { RequestResponse, RequestStatus } from '@models/request-status.model';
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterLinkWithHref,
    BtnComponent,
    BackgroundComponent,
],
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  
  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
  });

  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: RequestStatus = 'init';

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const email = params['email'];
      if(email) {
        this.form.patchValue({email});
      }
    });
  }

  doLogin() {
    if(this.form.valid) {
      this.status = 'loading';
      const {email, password} = this.form.getRawValue();
      this.authService.login(email, password).subscribe({
          next:() => {
            this.status = 'success';
            this.router.navigate(['/app']);
          },
          error: (error: RequestResponse) => {
            this.status = 'failed';
            console.log(error);
          }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
