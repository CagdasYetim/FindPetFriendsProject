import { FormControl } from '@angular/forms';

export interface FormModel{
  head?:string ,
    buttonName:string,
    buttonMethod() : any[],
    fields : {
      fieldName:string,
      label:string,
      isRequired:boolean,
      placeholder?:string,
      control:FormControl,
      errorMessage?:string,
      fieldType?:string
    }[],
    links?:{
      url:string,
      linkName:string,
      color?:string
    }[]
}
