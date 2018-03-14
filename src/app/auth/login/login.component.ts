/**
 * @Author: Spicer Matthews
 * @Date:   03/13/2018
 * @Email:  spicer@cloudmanic.com
 * @Last modified by:   Spicer Matthews
 * @Last modified time: 03/13/2018
 * @Copyright: 2018 Cloudmanic Labs, LLC. All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { NgForm }  from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../environments/environment';

interface LoginResponse {
  access_token: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit
{
  returnUrl: string = "/";
  errorMsg: string  = "";
  submitBtn: string = "Login";

  //
  // Construct.
  //
  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {}

  //
  // ngOnInit
  //
  ngOnInit()
  {
    // Remove local storage
    localStorage.removeItem('access_token');

    // get return url from route parameters or default to '/'
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  //
  // Do login to get an access token.
  //
  onSubmit(form: NgForm): void
  {
    // Update submit button
    this.submitBtn = "Logging In...";

    // Add oauth stuff
    form.value.grant_type = "password"
    form.value.client_id = environment.clientId

    // Make the the HTTP request:
    this.http.post<LoginResponse>(environment.appServer + '/oauth/token', form.value).subscribe(

      // Success
      data => {

        // // Store access token in local storage.
        localStorage.setItem('access_token', data.access_token);

        // Redirect to the home page
        this.router.navigate([ this.returnUrl ]);
      },

      // Error
      (err: HttpErrorResponse) => {

        // Change button back.
        this.submitBtn = "Login";

        if (err.error instanceof Error)
        {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else
        {
          // Change button back.
          this.submitBtn = "Login";

          if (err.error instanceof Error)
          {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
          } else
          {
            // Print error message
            this.errorMsg = err.error.error;
          }
        }

      }

    );

  }
}

/* End File */
