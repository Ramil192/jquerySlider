import { IView } from '../View/interface';
import { IModel } from '../Model/interface';
import {
  IObserver,
  IObserverLeftArgument,
  IObserverRightArgument,
  IObserverScaleArgument,
  IObserverTrackArgument,
  IObserverViewArgument,
} from '../Observer/interface';

export interface IController {
  view: IView
  model: IModel
  observerRender: IObserver<IObserverViewArgument>;
  observerControllerModel: IObserver<IObserverViewArgument>;
  observerControllerModelLeft: IObserver<IObserverLeftArgument>;
  observerControllerModelRight: IObserver<IObserverRightArgument>;
  observerControllerModelScale: IObserver<IObserverScaleArgument>;
  observerControllerModelTrack: IObserver<IObserverTrackArgument>;

  init(): void
}
