import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataApiService } from '../../data-api.service';
import { SharingDataService } from '../../sharing-data.service';
import { University } from '../University.model';

@Component({
  selector: 'app-adduniversity',
  imports: [FormsModule, CommonModule],
  templateUrl: './adduniversity.component.html',
  styleUrl: './adduniversity.component.css'
})
export class AdduniversityComponent {
  constructor(private service: DataApiService, private router: Router, private share: SharingDataService) { }
  userform: University = {
    id: '',
    name: '',
    country: '',
    web_pages: '',
    description: '',
  }
  visibleData = signal(false)
  ngOnInit() {
    this.share.currenvalue$.subscribe((data) => this.visibleData.set(data))
  }
  onsubmit() {
    let idvalue = Math.floor((Math.random() * 10000 - 1000) * 10000)
    let data = { ...this.userform, id: idvalue }
    this.service.PostUniversity(data).subscribe({
      next: () => {
        alert("Data Added Successfully")
        this.router.navigateByUrl('/home')
      },
      error: (err) => {
        alert("Something when wrong...")
      }
    })
  }
}
