import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService.getCategories().subscribe((categories:any)=>{
      console.log(this.categories);
      this.categories = categories.items;
    });
  }
}
