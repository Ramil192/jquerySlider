export default class Observer {
  constructor() {
    this.observers=[];
  }

  addObserver(observer){
    this.observers.push(observer);
  }

  notifyAll(){
    this.observers.forEach(item=>item());
  }

}