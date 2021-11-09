import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceManagementComponent } from './finance-management/finance-management.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'finance-management',
    component: FinanceManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
