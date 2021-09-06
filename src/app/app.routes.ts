import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { loadRemoteModule } from '@angular-architects/module-federation';
import { RoleGuardService } from './role-guard-service';
import { HomeComponent } from '../components/home/home.component';
import { WebComponentWrapper, WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';


export const APP_ROUTES: Routes = [   
  {
    path: 'ach',
    loadChildren: () => {
      return loadRemoteModule({
        remoteName: 'ach',
        exposedModule: './Module'
      })
      .then(m => m.AchModule) 
    },      
    canActivate: [RoleGuardService],
    data: { 
      expectedRole: 'ach.'     
    } 
  },
  { path: '', component: HomeComponent, data: {title: 'ACH'} },
  {
    path: 'react',
    component: WebComponentWrapper,
    data: {      
      remoteName: 'react_app',
      exposedModule: './web-components',
      elementName: 'react-app'
    } as WebComponentWrapperOptions
  },   
];

