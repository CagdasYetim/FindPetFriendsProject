import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public items : { name: string; url?: string | undefined; }[] =[
    {name:"REGISTER",url:"/register"},
    {name:"LOGIN",url:"/login"}
  ];

  public loggedInItems : { name: string; url?: string | undefined; }[] =[
    {name:"HOME",url:"/home"},
    {name:"PROFILE",url:"/profile"},
    {name:"EVENTS",url:"/events"}
  ];

  public loggedOutItems : { name: string; url?: string | undefined; }[] =[
    {name:"REGISTER",url:"/register"},
    {name:"LOGIN",url:"/login"}
  ];

  constructor() { }

  public setHeader(items : { name: string; url?: string | undefined; }[]) : void{
    this.items = items;
  }
}
