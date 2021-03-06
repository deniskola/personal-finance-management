import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) {
    
    }

    public getTransactions(){
      return this.http.get("http://127.0.0.1:4010/transactions");
    }

    public getCategories(){
      return this.http.get("http://127.0.0.1:4010/categories");
    }

    public categorizeTransaction(id:any, body:any){
      return this.http.post(`http://127.0.0.1:4010/transaction/${id}/categorize`, body);
    }

    public splitTransaction(id:any, body:any){
      return this.http.post(`http://127.0.0.1:4010/transaction/${id}/split`, body);
    }
}
