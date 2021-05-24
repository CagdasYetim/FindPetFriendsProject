import { NotificationDto } from './../_models/notificationDto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  addPushSubscriber(model:NotificationDto) {
      return this.http.post(this.baseUrl+'User/save-notification', model);
  }
}
