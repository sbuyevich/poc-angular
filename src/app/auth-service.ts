import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AccountInfo, InteractionStatus } from '@azure/msal-browser';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { environment } from './../environments/environment';

export class User {
    name?: string;
    username?: string;
    roles?: string [];
}

type IdTokenClaims = {
    preferred_username: string,
    roles: []
}

@Injectable({  providedIn: 'root' })

export class AuthService implements OnDestroy {        
    user?: User | null;
    loginDisplay = false;
    private readonly _destroying$ = new Subject<void>();

    private dataSource = new BehaviorSubject(new User());
    user$ = this.dataSource.asObservable();

    constructor(
        private broadcastService: MsalBroadcastService,
        private msalService: MsalService) {        
        this.broadcastService.inProgress$
            .pipe(
                filter((status: InteractionStatus) => status === InteractionStatus.None),
                takeUntil(this._destroying$)
            )
            .subscribe(() => {
                this.setLoginDisplay();
            })
    }

    login() {
        this.msalService.loginRedirect();        
    }

    logout() {
        this.msalService.logoutRedirect({
            postLogoutRedirectUri: environment.shellURL
        });
    }

    setLoginDisplay() {       
        this.user = null;
        this.loginDisplay = this.msalService.instance.getAllAccounts().length > 0;
        if (this.loginDisplay) {
            this.user = new User();
            const account = this.msalService.instance.getAllAccounts()[0];
            this.user.name = account.name;
            this.user.username = account.username;
            const idTokenClaims = account.idTokenClaims as IdTokenClaims;
            this.user.roles = idTokenClaims.roles; 
        }     
        this.dataSource.next(this.user as User);
    }

    hasRole(role: string){  
        return this.user != null &&  this.user.roles != null &&
        this.user.roles.filter((r) => r.includes(role)).length > 0;
    }

    ngOnDestroy(): void {
        this._destroying$.next(undefined);
        this._destroying$.complete();
    }

}


