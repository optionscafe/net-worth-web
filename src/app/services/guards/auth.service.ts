/**
 * @Author: Spicer Matthews
 * @Date:   03/13/2018
 * @Email:  spicer@cloudmanic.com
 * @Last modified by:   Spicer Matthews
 * @Last modified time: 03/13/2018
 * @Copyright: 2018 Cloudmanic Labs, LLC. All rights reserved.
 */

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  //
  // Construct.
  //
  constructor(private router: Router) {}

  //
  // Is the user allowed to use this page?
  //
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    // // Make sure we have an access token.
    if(localStorage.getItem('access_token')) {
      return true;
    }

    // Not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}

/* End File */
