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
import { Mark } from '../../models/mark';
import { AccountMark } from '../../models/account-mark';
import { environment } from '../../../environments/environment';

@Injectable()
export class MarksProvider {

  //
  // Construct.
  //
  constructor(public http: HttpClient) {}

  //
  // Get Marks
  //
  get() : Observable<Mark[]> {
    return this.http.get<Mark[]>(environment.appServer + '/api/v1/marks')
                    .map((data) => { return new Mark().fromJsonList(data); });
  }
}

/* End File */