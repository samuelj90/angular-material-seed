import { MatSnackBar } from '@angular/material';
import { error } from 'util';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges {
  private profile: any;
  constructor(public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.profile = this.authService.getProfile();
  }

  ngOnChanges() {
    this.handleRedirect(this.authService.isloggedIn());
  }

  logout() {
    this.authService.logout().subscribe(
      (value) => { this.handleRedirect(value); },
      (onError) => { this.handleError(onError); }
    );
  }

  handleRedirect(isLoggedIn) {
    if (!isLoggedIn) {
      const returnUrl = '/login';
      this.router.navigateByUrl(returnUrl);
    }
  }

  handleError(errorMessage) {
    this.snackBar.open(errorMessage, 'OK', {
      duration: 3000
    });
  }
}
