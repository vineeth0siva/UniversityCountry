import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from './EnteredComponent/country.model';
import { University } from './University/University.model';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  private countryFlagUrl = 'https://restcountries.com/v3.1/name/';
  private apiUrl="http://localhost:3000/countries";
  private Universityurl="http://localhost:3001/University"
  
  constructor(private http:HttpClient) { }
  getData():Observable<Country[]>{
    return this.http.get<Country[]>(this.apiUrl);
  }
  getFlagUrl(countryName: string): Observable<any> {
    return this.http.get<any>(`${this.countryFlagUrl}${countryName}`);
  }
  PostData(data:Country){
    return this.http.post<Country>(this.apiUrl,data);
  }

  UpdateData(id:string,data:Country){
    return this.http.put<Country>(`${this.apiUrl}/${id}`,data)
  }
  UniversityData(){
   return  this.http.get<any>(this.Universityurl);
  }
  PostUniversity(data:any){
    return this.http.post<University>(this.Universityurl,data);
  }
}
