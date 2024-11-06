import { Component, OnInit } from '@angular/core';
import { BackgroundComponent } from '../../components/background/background.component';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { LoginFormComponent } from "../../components/login-form/login-form.component";
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLinkWithHref,
    BackgroundComponent,
    HeaderComponent,
    FooterComponent,
    LoginFormComponent
],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
