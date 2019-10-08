import { EventEmitter } from "events";

type cbFunction = (...args: any[]) => void;

class Event2 {
  private eventEmitter: EventEmitter;
  private callbacks: { [eventName: string]: cbFunction[] };

  constructor() {
    this.eventEmitter = new EventEmitter();
    this.callbacks = {};
  }

  private addCallback(eventName: string, cb: cbFunction): void {
    if (this.callbacks[eventName]) {
      this.callbacks[eventName].push(cb);
    } else {
      this.callbacks[eventName] = [cb];
    }
  }

  private removeCallback(eventName: string, listener: cbFunction): void {
    this.eventEmitter.removeListener(eventName, listener);
    this.callbacks[eventName] = this.callbacks[eventName].filter(
      cb => cb != listener
    );
    if (this.callbacks[eventName].length === 0) {
      delete this.callbacks[eventName];
    }
  }

  public dispatch(eventName: string, value: any): void {
    if (!this.callbacks[eventName]) {
      return console.warn(`this event does not exist ${eventName}`);
    }
    this.eventEmitter.emit(eventName, value);
  }

  public on(eventName: string, ...cbs: cbFunction[]): void {
    cbs.forEach(cb => {
      this.eventEmitter.on(eventName, cb);
      this.addCallback(eventName, cb);
    });
  }

  public once(eventName: string, ...cbs: cbFunction[]): void {
    cbs.forEach(cb => {
      this.eventEmitter.once(eventName, (...args) => {
        cb(...args);
        this.removeCallback(eventName, cb);
      });
      this.addCallback(eventName, cb);
    });
  }

  public removeAllListener(eventName: string): void {
    if (!this.callbacks[eventName]) {
      return console.warn(`this event does not exist ${eventName}`);
    }
    this.eventEmitter.removeAllListeners(eventName);
    delete this.callbacks[eventName];
  }

  public removeListener(eventName: string, listener: cbFunction): void {
    if (!this.callbacks[eventName]) {
      return console.warn(`this event does not exist ${eventName}`);
    }
    this.removeCallback(eventName, listener);
  }

  public destroyAll(): void {
    // delete all events and its subscriber
  } 
}

export const event = new Event2();

// Next  support decorator and TEST
