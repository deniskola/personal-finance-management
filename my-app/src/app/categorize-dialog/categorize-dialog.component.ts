import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface Category{
  code: string;
  name: string;
}

@Component({
  selector: 'app-categorize-dialog',
  templateUrl: './categorize-dialog.component.html',
  styleUrls: ['./categorize-dialog.component.css']
})
export class CategorizeDialogComponent implements OnInit {
  
  categories:any[] = [];
  allCategories:any[]=[];
  subCategories:any[] = [];
 
  
  constructor(private formBuilder: FormBuilder, private transactionService: TransactionService) { 
    
  }
  ngOnInit(): void {
    this.transactionService.getCategories().subscribe((categories:any)=>{
      this.categories = categories.items.filter((item:any) =>
        item['parent-code'] === null
      );
    }); 
    this.transactionService.getCategories().subscribe((categories:any)=>{
      this.allCategories = categories.items
      
    }); 
  }

  selectCategoryOnChange(event:any){
   this.subCategories = this.allCategories.filter(x => x['parent-code'] === event.value)
  }

}


