import {IModel} from '../model/interfaceForModel'

export interface IInputLeft{
  input:JQuery,
}
export interface IInputRight{
  input:JQuery
}
export interface IRange{
  rangeDiv:JQuery
}
export interface IScale{
  divScale:JQuery
}
export interface ITextLeft{
  textSpan:JQuery
}
export interface ITextRight{
  textSpan:JQuery
}
export interface IThumbLeft{
  thumbDiv:JQuery
}
export interface IThumbRight{
  thumbDiv:JQuery
}
export interface ITrack{
  div:JQuery
}
export interface IView{
  
  model: IModel
  target: JQuery
  inputLeft: IInputLeft
  inputRight: IInputRight
  track: ITrack
  range: IRange
  thumbLeft: IThumbLeft
  thumbRight: IThumbRight
  textLeft: ITextLeft
  textRight: ITextRight
  scale: IScale

  init():void
  render():void
  renderThumbLeft():void
  renderThumbRight():void
}