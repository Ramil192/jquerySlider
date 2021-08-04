class Observer<T> {
  public observers: Array<(obj: T) => void>;
  constructor() {
    this.observers = [];
  }

  public addObserver(observer: (obj: T) => void): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: (obj: T) => void): void {
    this.observers = this.observers.filter((item) => item !== observer);
  }

  public callAllObserver(obj: T): void {
    this.observers.forEach((observer) => observer(obj));
  }
}

export default Observer;
