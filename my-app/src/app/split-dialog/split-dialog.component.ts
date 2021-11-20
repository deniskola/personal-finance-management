import { Component, OnInit, Inject } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { FinanceManagementComponent } from '../finance-management/finance-management.component';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

interface DialogData {
  transactions: any;
  transactionId: any;
  allCategories:any[];
} 
@Component({
  selector: 'app-split-dialog',
  templateUrl: './split-dialog.component.html',
  styleUrls: ['./split-dialog.component.css']
})
export class SplitDialogComponent implements OnInit {
  categories:any[] = [];
  subCategories:any[] = [];
  category: any;
  subCategory: any;
  transaction:any;
  sections:any[]= [0];
  splitRequestBody:any = {splits: []};
  section: any;
  amount: any = 0;
  splitBtn= false;
  totalAmount:any;

  constructor(
    private transactionService: TransactionService,
    public dialogRef: MatDialogRef<FinanceManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.transactionService.getCategories().subscribe((categories:any)=>{
      this.categories = categories.items.filter((item:any) =>
        item['parent-code'] === null
      );
    }); 
    this.sections.length < 2 ? this.splitBtn = false : true;
  }

  splitTransaction(){
    this.transactionService.splitTransaction( this.data.transactionId, this.splitRequestBody).subscribe((res)=>{
      this.transaction = this.data.transactions.find((item:any)=>item.id === this.data.transactionId);
      this.transaction.splits = this.splitRequestBody.splits;
    })
    console.log(this.data.transactions);
  }

  selectCategoryOnChange(event:any, section:any){
    this.subCategories = this.data.allCategories.filter((x:any) => x['parent-code'] === event.value)
    this.category = event.value;
    this.section = section;
    console.log(this.category)
    this.splitRequestBody.splits[section] = {catcode: this.category}
   }
  selectSubCategoryOnChange(event:any, section:any){
    this.subCategory = event.value;
    
    this.section = section;
    this.splitRequestBody.splits[section] = {catcode: this.subCategory.toString()}
  }

  onChange(event:any,section:any){
    this.section = section;
    this.amount = parseFloat(event.target.value)
    this.splitRequestBody.splits[section].amount = this.amount;
  }
  
  addSection(){
    this.sections.push(this.sections.length);
  }

  removeSection(section:any){
    this.sections.splice(section, 1);
  }

}
