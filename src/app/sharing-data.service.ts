import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {
  private searchSubject = new BehaviorSubject<string>('');  
  search$ = this.searchSubject.asObservable();

  private universityv=new BehaviorSubject<boolean>(true);
  currenvalue$=this.universityv.asObservable();

  setSearch(search: string): void {
    this.searchSubject.next(search);  
  }
  getSearch(): string {
    return this.searchSubject.value;  
  }
  setactiveUniversity(v:boolean){
    this.universityv.next(v);
  }
}