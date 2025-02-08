import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DataApiService } from '../../data-api.service';
import { SharingDataService } from '../../sharing-data.service';
import { University } from '../University.model';

@Component({
  selector: 'app-university-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatIconModule, RouterLink],
  templateUrl: './university-home.component.html',
  styleUrl: './university-home.component.css'
})
export class UniversityHomeComponent {
  
  constructor(private service: DataApiService, private router: Router,private share:SharingDataService) { }

  @Input() isSidebarOpen: boolean = false;
  @Output() togglebar = new EventEmitter<boolean>();  
  Univsersal: University[] = [];
  data: University[] = [];
  currentpage: number = 1;
  pagesize: number = 9;

  innerWidth: boolean = window.innerWidth > 900;
  @HostListener('window:resize', ['$event']) 
  onResize(event: any) {
    this.innerWidth = event.target.innerWidth > 900;
  }
  search= signal('');
  universal_country=signal(false);
  ngOnInit(): void {
    this.share.search$.subscribe((data) => {
      this.search.set(data);
      this.loadPage(1); 
    });
  
    this.share.currenvalue$.subscribe((data) => {
      this.universal_country.set(data);
      this.loadPage(1); 
    });
  
    this.service.UniversityData().subscribe({
      next: (d: any) => {
        this.Univsersal = d.map((university: any) => ({
          ...university,
          web_pages: university.web_pages || []
        }));
        this.loadPage(this.currentpage);
      },
      error: (error: any) => console.log(error)
    });
  }
  

  loadPage(page: number) {
    const start = (page - 1) * this.pagesize;
    const end = page * this.pagesize;
    let filteredData = this.Univsersal;
    console.log("Data in university"+this.universal_country());
    if (this.search() != '' && !this.universal_country()) {
      filteredData = this.Univsersal.filter((university: any) =>
        university.country.toLowerCase().includes(this.search().toLowerCase())
      );
    }
  
    this.data = filteredData.slice(start, end);
  }
  

  nextPage() {
    if ((this.currentpage * this.pagesize) < this.Univsersal.length) {
      this.currentpage++;
      this.loadPage(this.currentpage);
    }
  }

  prevPage() {
    if (this.currentpage > 1) {
      this.currentpage--;
      this.loadPage(this.currentpage);
    }
  }

  clickworked() {
    this.togglebar.emit(!this.isSidebarOpen); 
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/Home']);
  }
}
