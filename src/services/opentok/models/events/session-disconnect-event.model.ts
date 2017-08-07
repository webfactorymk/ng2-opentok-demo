import {OTEventBase} from "./shared/event-base.model";

export class SessionDisconnectEvent extends OTEventBase {

  readonly reason: string;

  constructor(event: any) {
    super(event);
    this.reason = this.event.reason;
  }
}
