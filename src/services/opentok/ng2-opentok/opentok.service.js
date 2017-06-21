"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Opentok = (function () {
    function Opentok() {
    }
    Opentok.isWebRTCSupported = function () {
        return OT.checkSystemRequirements() == 1;
    };
    ;
    return Opentok;
}());
exports.Opentok = Opentok;
//# sourceMappingURL=opentok.service.js.map