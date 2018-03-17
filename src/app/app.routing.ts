/**
 * @Author: Spicer Matthews
 * @Date:   03/13/2018
 * @Email:  spicer@cloudmanic.com
 * @Last modified by:   Spicer Matthews
 * @Last modified time: 03/13/2018
 * @Copyright: 2018 Cloudmanic Labs, LLC. All rights reserved.
 */

import { Routes, RouterModule } from '@angular/router';

// Generic
import { AuthGuard } from './services/guards/auth.service';
import { CoreComponent } from './layout/core/core.component';

// Auth
import { LoginComponent } from './auth/login/login.component';

// Dashboard
import { DashboardComponent } from './dashboard/dashboard.component';

// Accounts
import { AccountsComponent } from './accounts/accounts.component';
import { ViewComponent as AccountsViewComponent } from './accounts/view/view.component';

// Ledger
import { LedgerComponent } from './ledger/ledger.component';
import { ModifyComponent as LedgerModifyComponent } from './ledger/modify/modify.component';

// Routes
const appRoutes: Routes = [
  // Auth
  { path: 'login', component: LoginComponent },
  { path: 'logout', redirectTo: 'login' },

  // Core App
  { path: '', component: CoreComponent, children: [
    { path: '', component: DashboardComponent, canActivate: [ AuthGuard ] },
    { path: 'accounts', component: AccountsComponent, canActivate: [ AuthGuard ] },
    { path: 'accounts/:id', component: AccountsViewComponent, canActivate: [ AuthGuard ] },
    { path: 'ledger', component: LedgerComponent, canActivate: [ AuthGuard ] },
    { path: 'ledger/add/:type', component: LedgerModifyComponent, canActivate: [ AuthGuard ] }

  ] },

  // Otherwise redirect to home
  { path: '**', redirectTo: '' }
];


export const Routing = RouterModule.forRoot(appRoutes);
