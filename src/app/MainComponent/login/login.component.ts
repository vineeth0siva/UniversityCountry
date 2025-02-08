import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LoginServiceService } from '../../login-service.service';
import { NavbarComponent } from "../navbar/navbar.component";
@Component({
  selector: 'app-login',
  imports: [MatIconModule, NavbarComponent,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[LoginServiceService]
})
export class LoginComponent {
  userForm:FormGroup
  constructor(private fb:FormBuilder,private loginc:LoginServiceService ){
    this.userForm=this.fb.group({
      email:this.fb.nonNullable.control('',[Validators.required,Validators.email]),
      password:this.fb.nonNullable.control('',Validators.required)
    })
  }
  DataSubmit(){
    if(this.userForm.valid){
      this.loginc.check(this.userForm.value);
    }
  }
}
