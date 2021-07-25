export interface IObserver {
  observers: Function[]

  addObserver(observer: Function): void
  removeObserver(observer: Function): void
  callAllObserver(obj?:{[key:string]:number}): void
}

