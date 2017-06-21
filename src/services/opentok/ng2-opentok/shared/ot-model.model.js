"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var OTModel = (function () {
    function OTModel() {
    }
    OTModel.prototype.createObservable = function (object, func, param) {
        return rxjs_1.Observable.create(function (observer) {
            object[func](param, function (error) {
                if (error) {
                    observer.error(error);
                }
                else {
                    observer.next(true);
                    observer.complete();
                }
            });
        });
    };
    return OTModel;
}());
exports.OTModel = OTModel;
//# sourceMappingURL=ot-model.model.js.map