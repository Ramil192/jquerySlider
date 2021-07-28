import { IObserverRight ,IObserverRightArgument} from './interface';

class ObserverRight implements IObserverRight {
  public observers: Array<(obj: IObserverRightArgument) => void>;
  constructor() {
    this.observers = [];
  }

  public addObserver(observer: (obj: IObserverRightArgument) => void): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: (obj: IObserverRightArgument) => void): void {
    this.observers = this.observers.filter((item) => item !== observer);
  }

  public callAllObserver(obj:IObserverRightArgument): void {
    this.observers.forEach((observer) => observer(obj));
  }
}

export default ObserverRight;
