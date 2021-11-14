import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { HomeComponent } from './home/home.component';
import { FinanceManagementComponent } from './finance-management/finance-management.component';
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {CategorizeDialogComponent} from './categorize-dialog/categorize-dialog.component';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FinanceManagementComponent,
    CategorizeDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    HttpClientModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
