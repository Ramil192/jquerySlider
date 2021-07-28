import { IObserverLeft ,IObserverLeftArgument} from './interface';

class ObserverLeft implements IObserverLeft {
  public observers: Array<(obj: IObserverLeftArgument) => void>;
  constructor() {
    this.observers = [];
  }

  public addObserver(observer: (obj: IObserverLeftArgument) => void): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: (obj: IObserverLeftArgument) => void): void {
    this.observers = this.observers.filter((item) => item !== observer);
  }

  public callAllObserver(obj:IObserverLeftArgument): void {
    this.observers.forEach((observer) => observer(obj));
  }
}

export default ObserverLeft;
