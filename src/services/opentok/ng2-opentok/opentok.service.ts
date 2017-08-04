declare var OT: any;
declare var scriptLoaded: any;

const HAS_SYSTEM_REQUIREMENTS = 1;

export class Opentok {

  static isWebRTCSupported() {
    return OT.checkSystemRequirements() == HAS_SYSTEM_REQUIREMENTS;
  };
}

