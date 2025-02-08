import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LoginServiceService {
  constructor(private router: Router) { }

  enter: boolean = false;
  UserData = [
    { id: 0, email: "amal@gmail.com", password: "amal" },
    { id: 1, email: "akhil@gmail.com", password: "akhil" },
    { id: 2, email: "achu@gmail.com", password: "achu" },
    { id: 3, email: "nandhu@gmail.com", password: "nandhu" },
    { id: 4, email: "bibitha@gmail.com", password: "bibitha" },
    { id: 5, email: "appu@gmail.com", password: "appu" },
    { id: 6, email: "beena@gmail.com", password: "beena" },
    { id: 7, email: "hari@gmail.com", password: "hari" },
  ];
  check(data: any) {
    const user = this.UserData.find((datas) => datas.email === data.email && datas.password === data.password);
    if (user) {
      const userData = `frenfwkpkcofwfwfomrwpPPEJEPPFORIRIniekpfom${data.email}`;
      localStorage.setItem('user', userData);
      console.log("User data stored:", userData);  
      this.router.navigateByUrl('home');
    } else {
      console.log("Invalid login attempt");
    }
  }
  
}
