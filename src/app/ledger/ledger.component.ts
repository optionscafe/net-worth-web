/**
 * @Author: Spicer Matthews
 * @Date:   03/13/2018
 * @Email:  spicer@cloudmanic.com
 * @Last modified by:   Spicer Matthews
 * @Last modified time: 03/13/2018
 * @Copyright: 2018 Cloudmanic Labs, LLC. All rights reserved.
 */

import { Ledger } from '../models/ledger';
import { Component, OnInit } from '@angular/core';
import { LedgersProvider} from '../services/ledgers/ledgers';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html'
})
export class LedgerComponent implements OnInit
{
  ledgers: Ledger[]

  //
  // Construct
  //
  constructor(public ledgersProvider: LedgersProvider) {}

  //
  // ngOnInit
  //
  ngOnInit()
  {
    this.getLedgers();
  }

  //
  // Get Ledgers
  //
  getLedgers()
  {
    // Get ledger data
    this.ledgersProvider.get().subscribe((data) => {
      this.ledgers = data;
    });
  }

}

/* End File */
