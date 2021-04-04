import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl = environment.apiUrl;
  constructor() { }

  //http request
  saveProfileSettings(model:{}){
    console.log(model);
  }
}
