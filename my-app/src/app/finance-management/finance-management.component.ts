import {AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TransactionService } from '../transaction.service';

 export interface TransactionData {
   id: number;
   amount: number;
 }
@Component({
  selector: 'app-finance-management',
  templateUrl: './finance-management.component.html',
  styleUrls: ['./finance-management.component.css']
})
export class FinanceManagementComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['id'];
  public dataSource: MatTableDataSource<TransactionData>;
 
  public transaction:any ={};

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private transactionService: TransactionService) {
    
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((transaction:any)=>{
      console.log(transaction);
      this.dataSource.data = transaction.items;
    })

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}


