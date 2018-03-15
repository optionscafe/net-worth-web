/**
 * @Author: Spicer Matthews
 * @Date:   03/13/2018
 * @Email:  spicer@cloudmanic.com
 * @Last modified by:   Spicer Matthews
 * @Last modified time: 03/14/2018
 * @Copyright: 2018 Cloudmanic Labs, LLC. All rights reserved.
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Config
import { Routing } from './app.routing';

// Services
import { AuthGuard } from './services/guards/auth.service';
import { LedgersProvider } from './services/ledgers/ledgers';
import { AccountsProvider } from './services/accounts/accounts';
import { TokenInterceptor } from './services/http/token.interceptor';
import { LedgersCategoriesProvider } from './services/ledger_categories/ledger_categories';

// Components
import { AppComponent } from './app.component';
import { AccountsComponent } from './accounts/accounts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoreComponent } from './layout/core/core.component';
import { LedgerComponent } from './ledger/ledger.component';
import { ModifyComponent as LedgerModifyComponent } from './ledger/modify/modify.component';
import { LoginComponent } from './auth/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent,
    DashboardComponent,
    CoreComponent,
    LedgerComponent,
    LedgerModifyComponent,
    LoginComponent
  ],

  imports: [
    Routing,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],

  providers: [
    AuthGuard,
    LedgersProvider,
    AccountsProvider,
    LedgersCategoriesProvider,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
