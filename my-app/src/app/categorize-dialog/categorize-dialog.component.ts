import { Component, OnInit, Inject } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { FinanceManagementComponent } from '../finance-management/finance-management.component';

interface Category{
  code: string;
  name: string;
}
 interface DialogData {
  transactions: any;
  transactionId: any;
  allCategories:any[];
}

@Component({
  selector: 'app-categorize-dialog',
  templateUrl: './categorize-dialog.component.html',
  styleUrls: ['./categorize-dialog.component.css']
})
export class CategorizeDialogComponent implements OnInit {
  
  categories:any[]=[];
  subCategories:any[]=[];
  category:any;
  subCategory:any;
  transaction: any;
  categorizeRequestBody:any = {};
  categoryName: any;

  constructor(
    private transactionService: TransactionService,
    public dialogRef: MatDialogRef<FinanceManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { 
    
  }
  ngOnInit(): void {
    this.transactionService.getCategories().subscribe((categories:any)=>{
      this.categories = categories.items.filter((item:any) =>
        item['parent-code'] === null
      );
    }); 
  }

  categorizeTransaction(){
    this.subCategory !== undefined ? 
      this.categorizeRequestBody.catcode = this.subCategory.toString() :
      this.categorizeRequestBody.catcode = this.category;
    
    this.transactionService.categorizeTransaction( this.data.transactionId, this.categorizeRequestBody).subscribe((res)=>{
      this.transaction = this.data.transactions.find((item:any)=>item.id === this.data.transactionId);
      this.transaction.catcode = this.categorizeRequestBody.catcode;
    })
  }

  selectCategoryOnChange(event:any){
   this.subCategories = this.data.allCategories.filter((x:any) => x['parent-code'] === event.value)
   this.category = event.value;
  }

  selectSubCategoryOnChange(event:any){
    this.subCategory = event.value;
  }
}
