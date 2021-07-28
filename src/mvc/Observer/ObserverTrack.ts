import { IObserverTrack, IObserverTrackArgument } from './interface';

class ObserverTrack implements IObserverTrack {
  public observers: Array<(obj: IObserverTrackArgument) => void>;
  constructor() {
    this.observers = [];
  }

  public addObserver(observer: (obj: IObserverTrackArgument) => void): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: (obj: IObserverTrackArgument) => void): void {
    this.observers = this.observers.filter((item) => item !== observer);
  }

  public callAllObserver(obj: IObserverTrackArgument): void {
    this.observers.forEach((observer) => observer(obj));
  }
}

export default ObserverTrack;
