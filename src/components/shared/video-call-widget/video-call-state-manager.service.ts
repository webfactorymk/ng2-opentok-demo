import {Observable, Subject} from "rxjs";

export const enum VIDEO_CALL_STATES {
  noCall,
  incomingCall,
  calling,
  callStarted,
  callHungUpByOther
}

export class VideoCallStateManagerService {

  private _state: Subject<number> = new Subject<number>();

  getStateChange(): Observable<number> {
    return this._state.asObservable();
  }

  changeState(newState: number) {
    this._state.next(newState);
  }

}
