import {Observable} from "rxjs";
import {OTEvent} from "../events/event.model";

export interface IOTEventListener {
  // Adds an event handler function for one or more events. The handler is emitting values for the returned observable in this library.
  // https://tokbox.com/developer/sdks/js/reference/EventDispatcher.html#on
  on(type:string, context?:Object):Observable<OTEvent>;

  // Adds an event handler function for one or more events. Once the handler is called, the specified handler method is removed as a handler for this event.
  // The handler is emitting values for the returned observable in this library, so onNext will be called only once and than the handler will be removed.
  // https://tokbox.com/developer/sdks/js/reference/EventDispatcher.html#once
  once(type:string, context?:Object):Observable<OTEvent>;

  // Remove handler from events. The handler is emitting values for the returned observable in this library.
  // https://tokbox.com/developer/sdks/js/reference/EventDispatcher.html#off
  off(type?:string, context?:Object):Observable<OTEvent>;
}
