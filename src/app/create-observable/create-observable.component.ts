import { Component } from '@angular/core';
import { Observer, Observable } from 'rxjs';

@Component({
    templateUrl: './create-observable.component.html'
})
export class CreateObservableComponent {

    constructor() {
        // 定义了一个订阅函数（subscribe function），接收一个订阅者(Subscriber)
        function sequenceSubscriber(observer: Observer<number>) {
            observer.next(1);
            observer.next(2);
            observer.next(3);
            observer.complete();
            return { unsubscribe() { } };
        }

        // 创建可被观察的流(observable stream)
        const sequenceObservable = new Observable(sequenceSubscriber);

         // 传入观察者(Observer)，并将其转化为订阅者(Subscriber)
        sequenceObservable.subscribe({
            next(num) { console.log(num); },
            complete() { console.log('Finished sequence'); }
        });
    }
}
