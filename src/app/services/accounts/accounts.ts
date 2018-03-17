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
import { Account } from '../../models/account';
import { AccountMark } from '../../models/account-mark';
import { environment } from '../../../environments/environment';

@Injectable()
export class AccountsProvider {

  //
  // Construct.
  //
  constructor(public http: HttpClient) {}

  //
  // Get Accounts
  //
  get() : Observable<Account[]> {
    return this.http.get<Account[]>(environment.appServer + '/api/v1/accounts')
                    .map((data) => { return new Account().fromJsonList(data); });
  }

  //
  // Get Account by Id
  //
  getById(id: number) : Observable<Account> {
    return this.http.get<Account>(environment.appServer + '/api/v1/accounts/' + id)
                    .map((data) => { return new Account().fromJson(data); });
  }

  //
  // Get Account Marks by Account Id
  //
  getMarksByAccountId(id: number) : Observable<AccountMark[]> {
    return this.http.get<AccountMark[]>(environment.appServer + '/api/v1/accounts/' + id + '/marks')
                    .map((data) => { return AccountMark.buildForEmit(data); });
  }

}

/* End File */
