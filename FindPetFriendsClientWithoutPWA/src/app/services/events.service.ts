import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }

  public addEvent(model : any) : void{
    if(this.validateEventModel(model))
      console.log(model);
  }

  private validateEventModel(model:any) : boolean{
    //validate rules
    return true;
  }

}
