
// Opentok Event
// https://tokbox.com/developer/sdks/js/reference/Event.html

export class OTEvent {
  private _event;

  constructor(event: any) {
    this._event = event;
  }

  getCancelable(): boolean {
    return this._event.cancelable;
  }

  getTarget(): Object {
    return this._event.target;
  }

  getType(): string {
    return this._event.type;
  }

  isDefaultPrevented():boolean{
    return this._event.isDefaultPrevented();
  }

  preventDefault():void{
    this._event.preventDefault();
  }

}
