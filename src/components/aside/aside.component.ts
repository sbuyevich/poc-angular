import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/auth-service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  hasAchAccess = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) =>  this.hasAchAccess = this.authService.hasRole("ach."));       
  }
}
