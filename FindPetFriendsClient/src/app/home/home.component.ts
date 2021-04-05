import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lat = 51.678418;
  lng = 7.809007;

  cartController !:
    {
      headerTitle:string,
      headerSubTitle?:string,
      avatarImage:string,
      cartImage?:string,
      content:string,
      buttons : {
        name?:string,
        icon?:string,
        buttonMethod() : any
      }[]
    };

  constructor() { }

  ngOnInit(): void {
    this.setCarts();
  }

  setCarts():void{
    this.cartController = {
      headerTitle:"CartTitle",
      avatarImage:"../../assets/favicon-96x96.png",
      headerSubTitle : "this is a fucking sub title",
      content : "this is a abuk sabuk content this is a abuk sabuk content this is a abuk sabuk content this is a abuk sabuk content",
      buttons : [
        {
          icon : "favorite",
          buttonMethod : ()=>{console.log("cagdas Yapar olum");}
        }
      ]
    };
  }

}
