import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { IUsers } from '../model/users.interface';
import { userService } from '../services/api.services';

var M: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  usersList: IUsers[] = [];
  constructor(public userService: userService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshCustomerList();
  }

  resetForm(form?:any) {
    if (form)
      form.reset();   
  }

  onSubmit(formData: any){
    console.log('CustomerID:' + formData.customerid);
    if (formData._id == "") {      
      this.userService.postCustomer(formData).subscribe((res) => {
        //this.resetForm(formData);
        this.refreshCustomerList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.userService.putCustomer(formData).subscribe((res) => {
        //this.resetForm(formData);
        this.refreshCustomerList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshCustomerList(){
    this.userService.getCustomersList().subscribe((res) => {
      console.log(res);
      this.usersList = res as IUsers[];
      console.log('Result:' + this.usersList);
    });
  }
  onEdit(cus: IUsers){
    this.userService.selectedUsers = cus;
    console.log(this.userService.selectedUsers.name);
  }
  onDelete(_id: string, form: NgForm){
    if (confirm('Are you sure to delete this record ?') == true) {
      this.userService.deleteCustomer(_id).subscribe((res) => {
        this.refreshCustomerList();
        //this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }
}
