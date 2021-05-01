export interface CartController{
    headerTitle:string,
    headerSubTitle?:string,
    avatarImage:string,
    cartImage?:string,
    content:string,
    buttons : {
      name?:string,
      icon?:string,
      buttonMethod() : any
    }[],
    from?:string,
    to?:string
}
