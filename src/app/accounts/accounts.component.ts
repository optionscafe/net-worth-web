/**
 * @Author: Spicer Matthews
 * @Date:   03/13/2018
 * @Email:  spicer@cloudmanic.com
 * @Last modified by:   Spicer Matthews
 * @Last modified time: 03/13/2018
 * @Copyright: 2018 Cloudmanic Labs, LLC. All rights reserved.
 */

import { Account } from '../models/account';
import { Component, OnInit } from '@angular/core';
import { AccountsProvider} from '../services/accounts/accounts';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html'
})

export class AccountsComponent implements OnInit
{
  accounts: Account[]

  //
  // Construct
  //
  constructor(public accountsProvider: AccountsProvider) {}

  //
  // OnInit...
  //
  ngOnInit()
  {
    this.getAccounts();
  }

  //
  // Get Accounts
  //
  getAccounts()
  {
    // Get balance data
    this.accountsProvider.get().subscribe((data) => {
      this.accounts = data;
    });
  }

}

/* End File */
