import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // Validators
  emailPattern = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d.*)(?=.*\\W.*)[a-zA-Z0-9\\S]{8,}$';
  firstNamePattern = '^[a-zA-Z]*$';
  phonePattern = '([0-9]{0,})';

  // DataTable Pagination Icon
  nextPage = 'Next <i class="fa fa-lg fa-angle-right" aria-hidden="true"></i>'; 
  previousPage = '<i class="fa fa-lg fa-angle-left" aria-hidden="true"></i> Previous'; 
  firstPage = '<i class="fa fa-lg fa-angle-double-left" aria-hidden="true"></i>';
  lastPage = '<i class="fa fa-lg fa-angle-double-right" aria-hidden="true"></i>';

  constructor(
    private toaster: ToastrService,
    private router: Router,
  ) {}

  // Show Toasters
  showErrorMessage(msg){
    this.toaster.error(msg);
  }

  showSuccessMessage(msg){
    this.toaster.success(msg);
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  isUserLoggedIn(){
    if(localStorage.getItem('isLoggedIn')){
      this.router.navigate(['/']);
      return true;
    }
    else{
      return false;
    }
  }

  isUnauthorizedAccess(code){
    if(code === 401){
      localStorage.clear();
      this.showErrorMessage('Unauthorized Access.');
      this.router.navigate(['/login']);
    }else{
      return true;
    }
  }
}
