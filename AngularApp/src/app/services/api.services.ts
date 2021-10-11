import { Injectable }  from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsers } from '../model/users.interface';

@Injectable({
    providedIn:'root'
})
export class userService{
    
    selectedUsers!: IUsers;    
    readonly baseUrl = "http://localhost:8080/api/";
    constructor(private http: HttpClient){
    }

    getCustomersList(){
        return this.http.get(this.baseUrl);
    }
    getCustomer(_id: string){
        return this.http.get(this.baseUrl + `${_id}`);
    }
    postCustomer(cus: IUsers) {
        return this.http.post(this.baseUrl, cus);
    }
    putCustomer(cus: IUsers){
        return this.http.put(this.baseUrl + `${cus._id}`, cus);
    }
    deleteCustomer(_id: string){
        return this.http.delete(this.baseUrl + `${_id}`);
    }

}
