import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceManagementComponent } from './finance-management/finance-management.component';


const routes: Routes = [
  {
    path: '',
    component: FinanceManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
