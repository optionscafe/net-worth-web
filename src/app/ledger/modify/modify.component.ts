/**
 * @Author: Spicer Matthews
 * @Date:   03/13/2018
 * @Email:  spicer@cloudmanic.com
 * @Last modified by:   Spicer Matthews
 * @Last modified time: 03/14/2018
 * @Copyright: 2018 Cloudmanic Labs, LLC. All rights reserved.
 */

import { NgForm }  from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Account } from '../../models/account';
import { LedgerCategory } from '../../models/ledger_category';
import { AccountsProvider } from '../../services/accounts/accounts';
import { LedgersProvider, LedgersPost } from '../../services/ledgers/ledgers';
import { LedgersCategoriesProvider } from '../../services/ledger_categories/ledger_categories';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html'
})

export class ModifyComponent implements OnInit
{
  type: string = "";
  accounts: Account[];
  errorMsg: string  = "";
  submitBtn: string = "Save";
  categories: LedgerCategory[];
  selectedCategory: string = "";
  selectedAccount: number = 0;

  //
  // Construct.
  //
  constructor(private router: Router, private route: ActivatedRoute, public accountsProvider: AccountsProvider, public ledgersProvider: LedgersProvider, public ledgersCategoriesProvider: LedgersCategoriesProvider) { }

  //
  // OnInit.
  //
  ngOnInit()
  {
    // Income or Expense
    this.type = this.route.snapshot.params['type'];

    // Get the accounts for the select field.
    this.getAccounts();

    // Get the categories
    this.getLedgersCategories();
  }

  //
  // Get Accounts
  //
  getAccounts()
  {
    // Get balance data
    this.accountsProvider.get().subscribe((data) => {
      this.accounts = data;
      this.selectedAccount = data[0].Id;
    });
  }

  //
  // Get ledger categories
  //
  getLedgersCategories()
  {
    this.ledgersCategoriesProvider.get().subscribe((data) => {
      this.categories = data;
      this.selectedCategory = data[0].Name;
    });
  }

  //
  // Do submit add ledger form.
  //
  onSubmit(form: NgForm): void
  {
    // Update submit button
    this.submitBtn = "Saving...";

    // Figure out the Amount
    let amount = Number(form.value.amount);

    if(this.type == "expense")
    {
      amount = Number(form.value.amount) * -1;
    }

    // Create post data.
    let post = new LedgersPost(form.value.date, amount, form.value.account,
                                form.value.category, form.value.symbol, form.value.note);

    // Send POST to server with new ledger info.
    this.ledgersProvider.create(post).subscribe((data) => {
      this.router.navigate([ "/ledger" ]);
    });
  }
}

/* End File */
