// Opentok signaling https://tokbox.com/developer/guides/signaling/js/#send_signal_to_client

export class OTSignal {
    data: string;
    to: any; //Opentok Connection
    type: string;
    event: string

    constructor(type: string, data?: string, to?: any) {
        this.type = type;
        this.event = this._getSignalEvent(type);
      if (to) this.to = to;
      if (data) this.data = data;
    }

    private _getSignalEvent(type: string){
      return type ? ('signal:' + type) : 'signal';
    }


}
