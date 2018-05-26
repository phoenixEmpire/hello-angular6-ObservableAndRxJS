import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './multicast.component.html'
})
export class MulticastComponent {
    constructor() {
        // Create a new Observable that will deliver the above sequence
        const multicastSequence = new Observable(multicastSequenceSubscriber());

        // Subscribe starts the clock, and begins to emit after 1 second
        multicastSequence.subscribe({
            next(num) {
                console.log('1st subscribe: ' + num);
            },
            complete() {
                console.log('1st sequence finished.');
            }
        });

        // After 1 1/2 seconds, subscribe again (should "miss" the first value).
        setTimeout(() => {
            multicastSequence.subscribe({
                next(num) {
                    console.log('2ed subscribe: ' + num);
                },
                complete() {
                    console.log('2ed sequence finished.');
                }
            });

        }, 1500);
    }
}

function multicastSequenceSubscriber() {
    const seq = [1, 2, 3];
    // Keep track of each observer (one for every active subscription)
    const observers = [];
    // Still a single timeoutId because there will only ever be one set of values being generated, multicasted to each subscriber
    let timeoutId;
    // Return the subscriber function (runs when subscribe() function is invoked
    return (observer) => {
        observers.push(observer);
        // When this is the first subscription, start the sequence
        if (observers.length === 1) {
            timeoutId = doSequence({
                next(val) {
                    // Iterate through observers and notify all subscriptions
                    observers.forEach(_observer => _observer.next(val));
                },
                complete() {
                    // Notify all complete callbacks
                    observers.forEach(_observer => {
                        _observer.complete();
                    });
                }
            }, seq, 0);
        }

        return {
            unsubscribe() { // complete时会自动执行unsubscribe方法
                // Remove from the observers array so it's no longer notified
                observer = null;
                // If there's no more listeners, do cleanup
                let count = 0;
                observers.forEach(_observer => {
                    if (_observer) {
                        count++;
                    }
                });
                if (count === 0) {
                    clearTimeout(timeoutId);
                }
            }
        };
    };
}

// Run through an array of numbers, emitting one value per second until it gets to the end of the array.
function doSequence(observer, arr, idx) {
    return setTimeout(() => {
        if (idx === arr.length) {
            observer.complete();
        } else {
            observer.next(arr[idx]);
            doSequence(observer, arr, ++idx);
        }
    }, 1000);
}
