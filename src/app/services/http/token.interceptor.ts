/**
 * @Author: Spicer Matthews
 * @Date:   03/13/2018
 * @Email:  spicer@cloudmanic.com
 * @Last modified by:   Spicer Matthews
 * @Last modified time: 03/13/2018
 * @Copyright: 2018 Cloudmanic Labs, LLC. All rights reserved.
 */

import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class TokenInterceptor implements HttpInterceptor
{
  //
  // Construct
  //
  constructor() {}

  //
  // Run intercept
  //
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let access_token = localStorage.getItem('access_token');

    // Add in the headers for the API.
    request = request.clone({ setHeaders: { Authorization: `Bearer ${access_token}` } });

    // Let the request continue.
    return next.handle(request);
  }
}

/* End File */
