import { EventResponseDto } from './eventResponseDto';
import { DBSchema } from 'idb';

export interface DbModel extends DBSchema{
  Event : {
    key: number;
    value: EventResponseDto
  },
  EventPost : {
    key:number;
    value: {
      path:string,
      model:any,
      token:string
    }
  }
  ProfilePost : {
    key:number,
    value :{
      path:string,
      model:any,
      token:string
    }
  }
}
