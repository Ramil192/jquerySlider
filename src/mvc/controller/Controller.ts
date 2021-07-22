import { IView } from '../view/interface';
import { IModel } from '../model/interface';



export default class Controller {
  private view: IView;
  private model: IModel;

  constructor(model: IModel, view: IView) {
    this.model = model;
    this.view = view;
  }

  
  public init(): void {
    const { inputLeft, inputRight } = this.view;
    const { scale } = this.view.scale;
    
    this.model.observer.addObserver(this.view.render.bind(this.view,this.model.settings,this.model.state))

    
    inputLeft.bind('input', (e) => {
      this.model.setStateForLeftInput(parseInt((<HTMLInputElement>e.target).value, 10));
    });

    inputRight.bind('input', (e) => {
      this.model.setStateForRightInput(parseInt((<HTMLInputElement>e.target).value, 10));
    });

    scale.bind('click', (e: JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>) => {
      this.model.setStateForInput(+e.target.innerHTML);
    });
    
    this.model.checkSettings();
  }
}
