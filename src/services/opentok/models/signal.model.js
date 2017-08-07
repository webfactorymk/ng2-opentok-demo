// Opnetok signaling https://tokbox.com/developer/guides/signaling/js/#send_signal_to_client
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OTSignal = (function () {
    function OTSignal(type, data, to) {
        this.type = type;
        if (to)
            this.to = to;
        if (data)
            this.data = data;
    }
    return OTSignal;
}());
exports.OTSignal = OTSignal;
//# sourceMappingURL=signal.model.js.map