import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth=false;
  $auth:Subscription;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.$auth=this.authService.authChange
      .subscribe(authStatus=>{
        this.isAuth=authStatus;
      });
  }
  
  onToggleSidenav(){
    this.sidenavToggle.emit();
  }
  onLogout(){
    this.authService.logout();
  }
  ngOnDestroy() {
    this.$auth.unsubscribe();
  }


}
