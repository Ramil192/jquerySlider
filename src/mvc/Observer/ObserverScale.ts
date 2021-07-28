import { IObserverScale, IObserverScaleArgument } from './interface';

class ObserverScale implements IObserverScale {
  public observers: Array<(obj: IObserverScaleArgument) => void>;
  constructor() {
    this.observers = [];
  }

  public addObserver(observer: (obj: IObserverScaleArgument) => void): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: (obj: IObserverScaleArgument) => void): void {
    this.observers = this.observers.filter((item) => item !== observer);
  }

  public callAllObserver(obj: IObserverScaleArgument): void {
    this.observers.forEach((observer) => observer(obj));
  }
}

export default ObserverScale;
