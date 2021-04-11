import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  constructor() { }

  //http request
  saveProfileSettings(model:{}){
    console.log(model);
  }
}
