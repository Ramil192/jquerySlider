export interface IObserver<T> {
  observers: Array<(obj: T) => void>

  addObserver(observer: (obj: T) => void): void
  callObserver(obj: T): void
}
