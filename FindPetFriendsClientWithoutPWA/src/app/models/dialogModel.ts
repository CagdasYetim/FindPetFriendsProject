export interface DialogModel {
  label: string,
  text: string,
  name: string,
  buttonCloseLabel: string,
  buttonOkLabel: string,
  inputs: { type: string,mapEnable:boolean, label: string, data: any }[]
}
