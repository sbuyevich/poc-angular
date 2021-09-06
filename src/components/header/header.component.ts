import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { AccountInfo, AuthenticationResult, InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthService, User } from '../../app/auth-service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user?: User;
  loginDisplay = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.user$.subscribe((user) => this.setLoginDisplay(user));
  }

  login() {    
    this.authService.login();
  }

  logout() { // Add log out function here
    this.authService.logout()
  }

  setLoginDisplay(user: User) {
    this.user = user;
    this.loginDisplay = user != null;
  }

}
