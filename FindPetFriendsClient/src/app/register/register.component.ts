import { FormModel } from './../models/formModel';
import { ToastService } from './../services/toast.service';
import { AccountService } from './../services/account.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  componentController!: FormModel;

  constructor(
    private accountService : AccountService,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit(): void {
    this.componentController = {
      head : "Register" ,
      buttonName : "Register",
      buttonMethod : function():any[]{
        let results:{fieldName:string,fieldValue:string}[] =[];
        for(var i in this.fields){
          if(!this.fields[i].control.invalid){
            results.push({fieldName:this.fields[i].fieldName ,fieldValue: this.fields[i].control.value});
          }
          else{
            return [];
          }
        }
        return results;
      },
      fields : [
        {fieldName:"username" , label:"Name", isRequired:true,control : new FormControl('',Validators.required),errorMessage:"Name is required"}
        ,{fieldName:"password" , label:"Password", isRequired:true,control : new FormControl('',Validators.required),errorMessage:"password is needed",fieldType:"password"}
      ],
      links:[
        {url:"/login", linkName:"Login",color:"blue"}
      ]
    };
  }

  register(object:{fieldName:string,fieldValue:string}[]){
    let model :any = {} ;
    object.forEach(item => model[item.fieldName] = item.fieldValue);

    this.toastService.show('You have been successfully registered', {
      classname: 'bg-success text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Toast Header'
    });
    this.accountService.mock().subscribe(
      response =>{
        console.log(response);
      },
      error =>{
        console.log(error);
      }
    );
    /* this.router.navigateByUrl('/events'); */
    this.accountService.register(model).subscribe(response => {
      /* this.router.navigateByUrl('/profile'); */
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

}
