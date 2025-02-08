import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginauthGuard: CanActivateFn = (route, state) => {
  const logData = localStorage.getItem("user");
  const router = inject(Router);
  console.log("logData in guard:", logData);  
  
  if (logData != null) {
    return true;
  } else {
    router.navigateByUrl('login');
    return false;
  }
};
