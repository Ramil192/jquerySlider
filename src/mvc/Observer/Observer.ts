import { IObserver } from './interface';
import { ISettings, IState } from '../Model/interface';

class Observer implements IObserver {
  public observers: Array<(settings?: ISettings, state?: IState) => void>;
  constructor() {
    this.observers = [];
  }

  public addObserver(observer: (settings?: ISettings, state?: IState) => void): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: (settings: ISettings, state: IState) => void): void {
    this.observers = this.observers.filter((item) => item !== observer);
  }

  public callAllObserver(): void {
    this.observers.forEach(observer => observer());
  }
}

export default Observer;

