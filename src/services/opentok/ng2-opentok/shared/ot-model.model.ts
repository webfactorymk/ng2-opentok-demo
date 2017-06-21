import {Observable, Observer} from "rxjs";

export class OTModel {

    protected createObservableMethod(object: Object, func:  any, param?: any):Observable<any> {

        return Observable.create((observer: Observer<any>) => {
            object[func](param, (error) => {

                if (error) {
                    observer.error(error);
                }
                else {
                    observer.next(true);
                    observer.complete();
                }
            });
        });
    }

    protected createObservableEventListener(object: Object, func:  any, param?: any):Observable<any> {
      return Observable.create((observer: Observer<any>) => {
        object[func](param, (event) => {
            observer.next(event);
            observer.complete();
        });
      });
    }
}
