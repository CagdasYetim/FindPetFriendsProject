import { FilterDto } from './../models/filterDto';
import { EventResponseDto } from './../models/eventResponseDto';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

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
        },
        error => {
        }
      );
  }

  public getMyEvents() {
    return this.http.get<[EventResponseDto]>(this.baseUrl+'User/my-events');
  }

  public getAllEventsWithFilter(filter : FilterDto){
    return this.http.post<[EventResponseDto]>(this.baseUrl+'Event',filter);
  }

}

