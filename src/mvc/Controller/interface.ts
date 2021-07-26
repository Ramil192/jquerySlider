import { IView } from '../View/interface';
import { IModel } from '../Model/interface';
import { IObserver } from '../Observer/interface';

export interface IController {
  view: IView
  model: IModel
  observerControllerModel: IObserver;
  observerControllerModelScale: IObserver;
  observerControllerModelTrack: IObserver;
  observerControllerView: IObserver;

  init(): void
}
