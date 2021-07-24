import { IView } from '../view/interface';
import { IModel } from '../model/interface';
import { IObserver } from '../observer/interface';

export interface IController {
  view: IView
  model: IModel
  observerControllerModel: IObserver;
  observerControllerView: IObserver ;
  init(): void
}
