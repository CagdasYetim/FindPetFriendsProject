import { User } from './../_models/user';
import { take } from 'rxjs/operators';
import { AccountService } from './account.service';
import { IdbService } from './idb.service';
import { ToastService } from './toast.service';
import { ToComeDto } from './../_models/toComeDto';
import { FilterDto } from '../_models/filterDto';
import { EventResponseDto } from '../_models/eventResponseDto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private toastService : ToastService,
    private idbService:IdbService,
    private accountService: AccountService) { }

  public addEvent(model: any): void {
    var postModel: any = {};
    model.forEach((element: any) => {
      if (element.requestName === 'StartDate') {
        postModel[element.requestName] = new Date(element.data);
      }
      else
        postModel[element.requestName] = element.data;
    });
    this.http.post(this.baseUrl + 'User/create-event', postModel)
      .subscribe(
        response => {
          this.toastService.show('Event Create', {
            classname: 'bg-success text-light',
            delay: 2000,
            autohide: true,
            headertext: 'Your Event is created'
          });
        },
        error => {
          this.toastService.show('Event Create', {
            classname: 'bg-danger text-light',
            delay: 2000,
            autohide: true,
            headertext: 'Your Event is not created. But do not worry, we are going to sync it!'
          });
          var currentUser !: User;
          this.accountService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);

          if(currentUser){
            this.idbService.addEventPost({path:this.baseUrl+'User/create-event',model:postModel,token:`Bearer ${currentUser.token}`});
            this.backgroundSync();
          }

        }
      );
  }

  public getMyEvents() {
    return this.http.get<[EventResponseDto]>(this.baseUrl+'User/my-events');
  }

  public getAllEventsWithFilter(filter : FilterDto){
    return this.http.post<[EventResponseDto]>(this.baseUrl+'Event',filter);
  }

  public deleteMyEvent(id : number){
    return this.http.delete<number>(this.baseUrl+`User/delete-event/${id}`);
  }

  public toComeEvent(model : ToComeDto){
    return this.http.post(this.baseUrl+'Event/i-come',model);
  }

  private backgroundSync() {
    navigator.serviceWorker.ready
      .then((swRegistration) => swRegistration.sync.register('event-data'))
      .catch(console.log);
  }

}

