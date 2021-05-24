import { ProfileDto } from '../_models/profileDto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  saveProfileSettings(model :{}){
    this.http.post(this.baseUrl+'User/save-profile-settings',model)
        .subscribe(
          repsonse => {

          },
          error =>{

          }
        );
  }

  getProfile(){
    return this.http.get<ProfileDto>(this.baseUrl+'User/getProfile');
  }
}
