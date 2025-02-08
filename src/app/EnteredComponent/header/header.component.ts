import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharingDataService } from '../../sharing-data.service';
import { UniversityHomeComponent } from '../../University/university-home/university-home.component';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-header',
  imports: [SidebarComponent, CommonModule, FormsModule, UniversityHomeComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private share:SharingDataService,private router:Router) { }
  whichone:boolean=true;
  ngOnInit(): void {
    console.log(this.whichone);
    
  }
  changes(){
    this.whichone=!this.whichone;
    this.search=''
    this.share.setactiveUniversity(this.whichone)
    let path=this.router.url.split('/')[1];    
    if(!this.whichone && path=='add'){
      this.router.navigateByUrl('/adduniversity')
      this.onEnter()

    }
    if(this.whichone && path=='adduniversity'){
      this.router.navigateByUrl('/add')
      this.onEnter()
    }
  }
  onEnter() {
    this.share.setSearch(this.search)

  }
  closing(){
    this.isSidebarOpen = false;
    this.isNavbarOpen = false;
  }
 
  search: string = '';
  isNavbarOpen: boolean = false;
  isSidebarOpen: boolean = false;

  toggleNavbar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  onSidebarToggle(open: boolean) {
    this.isSidebarOpen = open;
    this.isNavbarOpen = open;
  }

}
