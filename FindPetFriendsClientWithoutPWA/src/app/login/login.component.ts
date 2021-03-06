import { Router } from '@angular/router';
import { FormModel } from './../models/formModel';
import { AccountService } from './../services/account.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  componentController!: FormModel;

  constructor(private accountService : AccountService,private router: Router) { }

  ngOnInit(): void {
    this.componentController = {
      head : "Login" ,
      buttonName : "Login",
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
        {url:"/register", linkName:"Register",color:"blue"}
      ]
    };
  }

  login(object:{fieldName:string,fieldValue:string}[]){
    let model :any = {} ;
    object.forEach(item => model[item.fieldName] = item.fieldValue);
    this.router.navigateByUrl('/events');
    /* this.accountService.login(model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    }); */
  }

}
