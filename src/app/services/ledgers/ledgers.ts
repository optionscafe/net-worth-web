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

  //
  // Create a new Ledger
  //
  create(post: LedgersPost) : Observable<Ledger> {
    return this.http.post<Ledger>(environment.appServer + '/api/v1/ledgers', post).map(
      (data) => { return new Ledger(data["id"], new Date(data["date"]), data["account_name"], data["category_name"], data["amount"], data["symbol"], data["note"]);
    });
  }
}

//
// Ledgers Response
//
export class LedgersPost
{
  constructor(
    public date: string,
    public amount: number,
    public account_id: number,
    public category_name: string,
    public symbol: string,
    public note: string
  ){}
}

/* End File */
