import {AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TransactionService } from '../transaction.service';
import { CategorizeDialogComponent } from '../categorize-dialog/categorize-dialog.component';
import {SelectionModel} from '@angular/cdk/collections';
import { SplitDialogComponent } from '../split-dialog/split-dialog.component';

 export interface TransactionData {
   id: number;
   amount: string;
  
 }
@Component({
  selector: 'app-finance-management',
  templateUrl: './finance-management.component.html',
  styleUrls: ['./finance-management.component.css']
})
export class FinanceManagementComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['select', 'id'];
  public dataSource: MatTableDataSource<TransactionData>;
  public transactions:any ={};
  selection = new SelectionModel<TransactionData>(true, []);
  public checkBoxIsShown: boolean = false ; // hidden by default
  selected!: number;
  catcode: any = {};
  transaction: any;
  allCategories:any[]=[];
  categoryName:any;
  transactionsKinds = [{
      key: "all",
      value: "All"
    },
    {
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
  
  public transactionId: any;
  public transactionIdArray: any;

  constructor(private transactionService: TransactionService, public dialog: MatDialog) {
    
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((transaction:any)=>{
      this.dataSource.data = transaction.items;
      this.transactions = transaction.items
      console.log(this.dataSource.data)
    })
    this.transactionService.getCategories().subscribe((categories:any)=>{
      this.allCategories = categories.items
    }); 
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  getTransactionId(transactionId: number){
    this.transactionId = transactionId;
    console.log("id:" ,this.transactionId);
    this.openDialog();
  }

  getAllTransactionsIds(transactionIdArray: any[]){
    this.transactionIdArray = transactionIdArray;
    console.log("id:" ,this.transactionId);
    this.openSplitDialog();
  }

  filterTransactionsByKind(event: any){
    this.dataSource.data = this.transactions.filter((x:any) => 
      event.value === "all" ? true : x['kind'] === event.value
    );
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue;
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(CategorizeDialogComponent, {
      data: {
        transactions: this.dataSource.data,
        transactionId: this.transactionId,
        allCategories: this.allCategories
      },
    });
  }

  openSplitDialog() {
    const dialogRef = this.dialog.open(SplitDialogComponent, {
      data: {
        transactions: this.dataSource.data,
        transactionIdArray: this.transactionIdArray,
        allCategories: this.allCategories
      },
    });
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

  getCategoryNameByCode(code:any){
    this.categoryName = this.allCategories.find((x:any)=> x.code === code || x.code.toString() === code.toString()).name
    return this.categoryName
  }
}


