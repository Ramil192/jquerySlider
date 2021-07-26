import { IObserver } from './interface';

class Observer implements IObserver {
  public observers: Function[];
  constructor() {
    this.observers = [];
  }

  public addObserver(observer: Function): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: Function): void {
    this.observers = this.observers.filter((item) => item !== observer);
  }

  public callAllObserver(obj?:{[key:string]:number}): void {
    this.observers.forEach((observer) => observer(obj));
  }
}

export default Observer;
