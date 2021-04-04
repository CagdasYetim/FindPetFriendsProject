export interface DialogModel {
  label: string,
  text: string,
  name: string,
  buttonCloseLabel: string,
  buttonOkLabel: string,
  inputs: { type: string, label: string, data: any }[]
}
