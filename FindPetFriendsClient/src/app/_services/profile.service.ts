import { IdbService } from './idb.service';
import { take } from 'rxjs/operators';
import { User } from './../_models/user';
import { AccountService } from './account.service';
import { ToastService } from './toast.service';
import { ProfileDto } from '../_models/profileDto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private toastService : ToastService,
    private accountService: AccountService,
    private idbService:IdbService
    ){ }

  saveProfileSettings(model :{}){
    this.http.post(this.baseUrl+'User/save-profile-settings',model)
        .subscribe(
          repsonse => {
            this.toastService.show('Profile Save', {
              classname: 'bg-success text-light',
              delay: 2000,
              autohide: true,
              headertext: 'Your Profile is saved'
            });
          },
          error =>{
            this.toastService.show('Profile Save', {
              classname: 'bg-danger text-light',
              delay: 2000,
              autohide: true,
              headertext: 'Your Profile is not saved. But do not worry, we are going to sync it!'
            });

            var currentUser !: User;
            this.accountService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);

            if(currentUser){
              this.idbService.addProfilePost({path:this.baseUrl+'User/save-profile-settings',model:model,token:`Bearer ${currentUser.token}`});
              this.backgroundSync();
            }
          }
        );
  }

  getProfile(){
    return this.http.get<ProfileDto>(this.baseUrl+'User/getProfile');
  }

  private backgroundSync() {
    navigator.serviceWorker.ready
      .then((swRegistration) => swRegistration.sync.register('profile-data'))
      .catch(console.log);
  }
}
