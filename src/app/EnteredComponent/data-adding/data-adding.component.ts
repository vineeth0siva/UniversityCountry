import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataApiService } from '../../data-api.service';
import { Country } from '../country.model';

@Component({
  selector: 'app-data-adding',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './data-adding.component.html',
  styleUrl: './data-adding.component.css'
})
export class DataAddingComponent {
  constructor(private service: DataApiService, private router: Router, private route: ActivatedRoute) { }
  updateid: number = 0;
  private countries: Country[] = [];
  length: number = 0;
  updatingdata: any = ''
  ngOnInit() {
    this.service.getData().subscribe({
      next: (data) => {
        this.countries = data;
        this.length = this.countries.length +1 ;
        console.log("Length"+this.length);
        
        this.route.params.subscribe(p => {
          this.updateid = +p['id'];  
          console.log('Update ID:', this.updateid);
          if (this.updateid && !isNaN(this.updateid)) {
            this.updatebutton = true;
            this.updatingdata = this.countries.find(data => Number(data.id) === this.updateid);
            if (this.updatingdata) {
              this.userForm.patchValue({
                id: this.updatingdata.id,
                sortname: this.updatingdata.sortname,
                name: this.updatingdata.name,
                countrycode: this.updatingdata.countrycode,
                phoneCode: this.updatingdata.phoneCode
              });
            } else {
              alert("Country not found!");
              this.router.navigateByUrl('home');
            }
          }
        });
        
      },
      error: (Err) => console.log(`There is an error in fetching: ${Err}`)
    });
  }
  
  onSubmit() {
    if (this.updateid) {
      this.UpdatData()
    }
    else {
      this.Datas()
    }
  }
  http = inject(HttpClient);
  updatebutton: boolean = false;
  userForm = new FormGroup({
    id: new FormControl(''),
    flag: new FormControl(''),
    sortname: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    countrycode: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    phoneCode: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(5)])
  });

  existData: Country | undefined;
  exist: boolean = false;
  Datas() {
    if (this.userForm.valid) {
      this.existData = this.countries.find((data) => {
        return data.name.toUpperCase() === this.userForm.value.name?.toUpperCase();
      });

      console.log(this.existData);
      this.exist = this.existData ? false : true;
      console.log(this.exist);

      const userForms: any = {
        ...this.userForm.value,
        id: this.length.toString()
      };

      console.log(userForms);

      if (this.exist) {
        this.service.PostData(userForms).subscribe({
          next: () => {
            alert("Data Successfully entered");
            console.log(userForms);
            this.router.navigateByUrl('home');
          },
          error: (err) => {
            alert(`There is an Error in Data: ${err}`);
          }
        });
      } else {
        alert("This country already exists!");
      }
    }
  }

  UpdatData() {
    if (this.updatingdata) {
      const new_data = {
        name: this.userForm.get('name')?.value ?? this.updatingdata.name,
        sortname: this.userForm.get('sortname')?.value ?? this.updatingdata.sortname,
        countrycode: this.userForm.get('countrycode')?.value ?? '',
        phoneCode: this.userForm.get('phoneCode')?.value ?? this.updatingdata.phoneCode
      };
  
      console.log("New data "+new_data);
      this.service.UpdateData(this.updateid.toString(), new_data).subscribe({
        next: () => {
          alert("Data Updated Successfully");
          const index = this.countries.findIndex(country => country.id === this.updateid);
          
          if (index > -1) {
            
            this.countries[index] = { ...new_data, id: this.updateid }; 
            console.log(this.countries[index]);
            
          }
            this.router.navigateByUrl('home');
        },
        error: (err) => {
          alert("Data update failed due to error: " + err);
        }
      });
    }
  }
  

}
