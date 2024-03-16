import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGardGuard: CanActivateFn = (route, state) => {
  const _Roter=inject(Router)
  if(localStorage.getItem('etoken')){
    return true;
  }
  else{
    _Roter.navigate(['/login'])
    return false;

  }
};
