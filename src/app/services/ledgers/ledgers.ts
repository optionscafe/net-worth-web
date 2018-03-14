/**
 * @Author: Spicer Matthews
 * @Date:   03/13/2018
 * @Email:  spicer@cloudmanic.com
 * @Last modified by:   Spicer Matthews
 * @Last modified time: 03/13/2018
 * @Copyright: 2018 Cloudmanic Labs, LLC. All rights reserved.
 */

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ledger } from '../../models/ledger';
import { environment } from '../../../environments/environment';

@Injectable()
export class LedgersProvider {

  //
  // Construct.
  //
  constructor(public http: HttpClient) {}

  //
  // Get Ledgers
  //
  get() : Observable<Ledger[]> {
    return this.http.get<Ledger[]>(environment.appServer + '/api/v1/ledgers').map(
      (data) => { return Ledger.buildForEmit(data);
    });
  }

}

/* End File */
