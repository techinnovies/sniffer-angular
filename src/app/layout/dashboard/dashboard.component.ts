import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  customers = [];
  headers = null;
  p: number = 1;
  total: number = 0;
  region = null;
  filters = {
    page: 1,
    limit: 10,
    region: null
  }
  deletedCount = null;
  
  constructor(
    private title: Title,
    private authService: AuthService,
    private commonService: CommonService,
    private formBuilder: FormBuilder
  ) { 
    this.title.setTitle('Sniffer | Dashboard');
  }

  ngOnInit(): void {
    this.getCustomer();
  }

  uploadCustomer(event){
    let file = event.target.files[0];
    let formData = new FormData();
    formData.append("customerFile", file)

    this.authService.fileRequest('customer/upload', formData).then(res => {
      this.commonService.showSuccessMessage(res['message']);
      this.getCustomer();
    })
  }

  getCustomer(data?){
    this.authService.postRequest('customer/get/all', data ? data : this.filters).then(res => {
      if(res){
        this.customers = res['data'];
        this.headers = this.customers[0];
        this.total = res['totalResults'];
      }
    });
  }

  pageChanged(e){
    this.p = e;
    this.filters.page = e;
    this.authService.postRequest('customer/get/all', this.filters).then((res) => {
      if(res){
        this.customers = res ? res['data']: null;
        this.total = res ? res['totalResults']: null;
      }
    }, err => {
      this.commonService.showErrorMessage(err);
    });
  }

  filter(){
    this.filters.page = this.p;
    this.filters.region = this.region;
    
    this.getCustomer(this.filters);
  }

  clearFilter(){
    this.region = null;
    this.getCustomer({
      page: 1,
      limit: 10,
      region: null
    });
  }

  // 1 - Delete All Customer
  // 2 - Delete All Uploaded Files
  delete(type){
    if(type === 1){
      this.authService.deleteRequest('customer/delete/all', null).then(res => {
        this.deletedCount = res['message']['deletedCount'];
        this.getCustomer();
      });
    }
    if(type === 2){
      
    }
  }
}
