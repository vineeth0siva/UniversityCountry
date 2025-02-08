import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isNavibarCollapsed = false;
  ngOnInit() {
    this.isNavibarCollapsed = true;
  }
  toggleNavbar(){
    this.isNavibarCollapsed = !this.isNavibarCollapsed;
  }
}
