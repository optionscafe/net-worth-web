/**
 * @Author: Spicer Matthews
 * @Date:   03/13/2018
 * @Email:  spicer@cloudmanic.com
 * @Last modified by:   Spicer Matthews
 * @Last modified time: 03/14/2018
 * @Copyright: 2018 Cloudmanic Labs, LLC. All rights reserved.
 */

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LedgerCategory } from '../../models/ledger_category';
import { environment } from '../../../environments/environment';

@Injectable()
export class LedgersCategoriesProvider {

  //
  // Construct.
  //
  constructor(public http: HttpClient) {}

  //
  // Get LedgerCategories
  //
  get() : Observable<LedgerCategory[]> {
    return this.http.get<LedgerCategory[]>(environment.appServer + '/api/v1/ledger_categories').map(
      (data) => { return LedgerCategory.buildForEmit(data);
    });
  }
}

/* End File */
