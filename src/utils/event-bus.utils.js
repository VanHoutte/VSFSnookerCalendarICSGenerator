import events from 'events';

export const eventBus = new events.EventEmitter();

export const Event = {
    AppReady: 'appReady'
};