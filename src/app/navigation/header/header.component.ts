import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth=false;
  constructor() { }

  ngOnInit() {
  }
  
  onToggleSidenav(){
    this.sidenavToggle.emit();
  }
  onLogout(){
  	console.log('toggle');
  }
  ngOnDestroy() {
  }


}
