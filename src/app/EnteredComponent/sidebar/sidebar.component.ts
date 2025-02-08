import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataApiService } from '../../data-api.service';
import { SharingDataService } from '../../sharing-data.service';
import { Country } from '../country.model';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterOutlet,  MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private dataapi: DataApiService,
    private share: SharingDataService,) { }

  private searchSubscription: Subscription | undefined;
  search: string = '';
  countries: Country[] = [];
  paginatedCountries: Country[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  innerWidth: boolean = window.innerWidth > 900;
  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.innerWidth = event.target.innerWidth > 900;
  }

  ngOnInit(): void {
    this.share.currenvalue$.subscribe((data) => this.universal_country = data)
    this.searchSubscription = this.share.search$.subscribe((searchValue) => {
      this.search = searchValue;
      this.paginateCountries();
    });
    const currentUrl = this.router.url.split('/')[1];
    this.activeItem = currentUrl || 'home';
    this.dataapi.getData().subscribe({
      next: (data) => {
        this.countries = data;
        this.getImage(this.countries);
        this.paginateCountries();
      },
      error: (err) => {
        console.error('Error fetching countries:', err);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
  universal_country: boolean = false;
  paginateCountries(): void {
    console.log("Data in sidebar"+this.universal_country);
    const filteredCountries = this.search!='' && this.universal_country
      ? this.countries.filter((x) =>
        x.name.toLowerCase().includes(this.search.toLowerCase())
      )
      : this.countries;

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedCountries = filteredCountries.slice(start, end);
    this.totalPages = Math.ceil(filteredCountries.length / this.itemsPerPage);
  }

  ZtoA() {
    this.countries.sort((a, b) => b.name.localeCompare(a.name));
    this.paginateCountries();
    this.isDropdownOpen = false;
  }
  AtoZ() {
    this.countries.sort((a, b) => a.name.localeCompare(b.name));
    this.paginateCountries();
    this.isDropdownOpen = false
  }
  @Input() isSidebarOpen: boolean = false;
  @Output() itemClicked = new EventEmitter<boolean>();

  isDropdownOpen: boolean = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  activeItem: string = '';

  onPageChange(page: number): void {

    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginateCountries();
  }
  getImage(countries: Country[]): void {
    countries.forEach(country => {
      this.dataapi.getFlagUrl(country.name).subscribe({
        next: (data) => {
          if (data && data[0] && data[0].flags) {
            country.flag = data[0]?.flags.png;
          } else {
            console.error(`No flag data found for ${country.name}`);
          }
        },
        error: (err) => {

          console.error(`Error fetching flag for ${country.name}:`, err);
        }
      });
    });
  }


  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.itemClicked.emit(this.isSidebarOpen);
  }

  changecolor(event: any): void {
    const currentUrl = this.router.url.split('/')[1];
    this.activeItem = currentUrl || 'home';
    console.log(event.target.id);

    switch (event.target.id) {
      case 'home':
        this.router.navigateByUrl('/home');
        this.activeItem = 'home';
        break;
      case 'add':
        this.router.navigateByUrl('/add');
        this.activeItem = 'add';
        break;
      case 'logout':
        this.router.navigateByUrl('/logout');
        break;
      default:
        break;
    }
    this.toggleSidebar();
  }
  logout() {
    if (confirm("are you sure")) {
      localStorage.removeItem('user');
      this.router.navigateByUrl('Home')
    }
  }
}
