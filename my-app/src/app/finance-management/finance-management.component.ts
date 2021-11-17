import {AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TransactionService } from '../transaction.service';
import { HomeComponent } from '../home/home.component';
import { CategorizeDialogComponent } from '../categorize-dialog/categorize-dialog.component';
import {SelectionModel} from '@angular/cdk/collections';

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
  public displayedColumns: string[] = ['select', 'id'];
  public dataSource: MatTableDataSource<TransactionData>;
  public transaction:any ={};
  selection = new SelectionModel<TransactionData>(true, []);
  public checkBoxIsShown: boolean = false ; // hidden by default
  selected!: number;
  
  transactionsKinds = [{
      key: "pmt",
      value: "Payment"
    },
    {
      key: "dep",
      value: "Deposit"
    },
    {
      key: "fee",
      value: "Fee"
    }]

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private transactionService: TransactionService, public dialog: MatDialog) {
    
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((transaction:any)=>{
      this.dataSource.data = transaction.items;
      this.transaction = transaction.items
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterTransactionsByKind(event: any){
    this.dataSource.data = this.transaction.filter((x:any) => x['kind'] === event.value);
    console.log(this.dataSource.data)
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue;
  }
  
  openDialog() {
    this.dialog.open(CategorizeDialogComponent);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: TransactionData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  toggleShow() {
    this.checkBoxIsShown = ! this.checkBoxIsShown;
  }

}


