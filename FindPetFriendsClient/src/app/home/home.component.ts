import { IdbService } from './../_services/idb.service';
import { EventResponseDto } from '../_models/eventResponseDto';
import { CartController } from '../_models/cartController';
import { EventsService } from '../_services/events.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cartControllers :CartController[] = [];

  constructor(
    private eventService:EventsService
  ){ }

  ngOnInit(): void {
    this.getMyEvents();
  }

  getMyEvents():void{
    this.eventService.getMyEvents()
        .subscribe(
          response =>{
            this.mapResponse(response);
          },
          error => {

          }
        );
  }

  private mapResponse(eventResponseDto: EventResponseDto[]):void{
    eventResponseDto.forEach(
      r =>{
        var fromSplit = r.from.split('-');
        var toSplit = r.to.split('-');
        var date = new Date(r.startDate);
        var c: CartController = {
          headerTitle: r.nameOfEvent,
          avatarImage:"../../assets/favicon-96x96.png",
          headerSubTitle : r.city,
          content : `Date: ${this.pad( date.getDay())}-${this.pad( date.getMonth())}-${this.pad( date.getFullYear())} </br>
                     Time: ${this.pad( date.getHours())}:${this.pad( date.getMinutes())} </br>
                     Start Point : ${fromSplit[0]?.substring(0,5)}-${fromSplit[1]?.substring(0,5)} </br>
                     End Point : ${toSplit[0]?.substring(0,5)}-${toSplit[1]?.substring(0,5)} </br>
                     I have ${r.iHavesList} </br>
                     Love to have with ${r.canJoinsList}`,
          buttons : [
            {
              icon : "delete",
              buttonMethod : ()=>{
                this.eventService.deleteMyEvent(r.id).subscribe(
                  response =>{
                    this.cartControllers = this.cartControllers.filter(obj => obj.id !== r.id);
                  },
                  error=>{

                  }
                );
              }
            }
          ],
          id : r.id
        };
        this.cartControllers.push(c);
      }
    );
  }

  private pad(d:number) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }

  public getLat(val :string){
    return Number.parseFloat( val.split('-')[0]);
  }

  public getLng(val :string){
    return Number.parseFloat(val.split('-')[1]);
  }
}
