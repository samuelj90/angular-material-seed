import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;
  private returnUrl: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (this.authService.isloggedIn) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  private login() {
    const val = this.loginForm.value;

    if (val.userName && val.password) {
      this.authService.login(val.userName, val.password).subscribe(
        (value: boolean) => {
          if (value) {
            this.router.navigateByUrl(this.returnUrl);
          }
        },
        error => {
          throw new Error('Some error occured');
        }
      );
    }
  }

}
