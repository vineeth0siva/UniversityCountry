import { Component } from '@angular/core';
import { SharingDataService } from '../../sharing-data.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private share:SharingDataService){}
universityactive: boolean=false;
OnngInit(){
  this.share.currenvalue$.subscribe(data=>
    this.universityactive=data
  )
}
}
