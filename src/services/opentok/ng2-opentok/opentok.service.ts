
declare var OT: any;
declare var scriptLoaded: any;

export class Opentok {

    static isWebRTCSupported(){
        return OT.checkSystemRequirements() == 1;
    };
}

