import { Request } from "express";
import { EventEmitter } from "node:events";

/*
In Node.js, the EventEmitter class is a fundamental building block for creating event-driven applications. It provides a powerful mechanism for objects to communicate with each other by emitting named events and allowing other objects to listen for those events and respond accordingly.
Core Concepts : -
Emitter: An object that can emit named events.
Listener: A function that is registered to be called when a specific event is emitted.
Event: A named signal that carries optional data.
*/

/*
- tool for managing events and asynchronous operations.
It enables objects to emit named events and register listener
functions that respond to those events.Many built-in Node.js modules, such as net and fs, are instances of EventEmitter,
allowing them to emit events like connections or file operations.

Uses:
 - EventEmitter can be used to create a pub/sub system.
 - Stream Processing - Nodejs streams are instances of EventEmitter.
 - 

 removeListener(eventName, listener): Removes a listener from the specified event.
 removeAllListeners(eventName): Removes all listeners from the specified event.
 emit(eventName, [arg1], [arg2],...): Emits the specified event, passing the provided arguments to the listeners.
 once(eventName, listener): Adds a one-time listener for the event. The listener is invoked only the first time the event is emitted.
 listenerCount(eventName): Returns the number of listeners for the specified event.
 eventNames(): Returns an array of all the event names that the EventEmitter has registered.
*/
export const MyEventEmitter = new EventEmitter();

class RequestEmitter extends EventEmitter { }

export const requestEmitter = new RequestEmitter();

//Start listening for an event
MyEventEmitter.on("event-emitted",(message: string) => {
	console.log(`Received event: ${message}`);
});
//or we can use addListener method as well
MyEventEmitter.addListener("event-emitted",(message: string) => {
	console.log(`Received event: ${message}`);
	console.log("Event Emitter is listening no events",MyEventEmitter.listenerCount("event-emitted"));
})

requestEmitter.on("request-received",(req: Request) => {
	console.log(`Request Received: ${JSON.stringify(req.originalUrl)}`);
});

MyEventEmitter.on("error",(err: Error) => {
	console.error(`Error occurred in MyEventEmitter: ${err}`);
})

requestEmitter.on("error",(err: Error) => {
	console.error(`Error occurred in RequestEmitter: ${err}`);
});

requestEmitter.on('request-received',(arg1,arg2) => {
	console.log(`Event received with args: ${JSON.stringify(arg1.originalUrl)}, ${arg2}`);
});

requestEmitter.once('request-received',() => {
	console.log('This will only be logged once.');
});

requestEmitter.eventNames().forEach((eventName) => {
	console.log(`Event name: ${eventName.toString()}`);
});

//custom eventEmitter class for learning
class CustomEventEmitter extends EventEmitter {
	constructor() {
		super();
		this.eventNames().forEach((eventName) => {
			console.log(`Event name: ${eventName.toString()}`);
		});
	}

	emitCustomEvent(message: string) {
		this.emit('custom-event',message);
	}
	onCustomEvent(listener: (message: string) => void) {
		this.on('custom-event',listener);
	}
}

export const customEventEmitter = new CustomEventEmitter();
customEventEmitter.onCustomEvent((message: string) => {
	console.log(`Received custom event: ${message}`);
})
