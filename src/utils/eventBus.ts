import type { BaseEventMap, MapEvents } from '../types';

export const createEventBus = <Events extends BaseEventMap>() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const listeners: Map<keyof Events, Set<(payload: any) => void> | undefined> =
    new Map();

  const subscribe = <Key extends keyof Events>(
    event: Key,
    listener: (payload: Events[Key]) => void,
  ) => {
    const eventListeners = listeners.get(event) || new Set();
    eventListeners.add(listener);
    listeners.set(event, eventListeners);

    return () => {
      eventListeners.delete(listener);
      if (!eventListeners.size) listeners.delete(event);
    };
  };

  const publish = <Key extends keyof Events>(
    event: Key,
    payload: Events[Key],
  ) => {
    const subscribers = listeners.get(event);
    if (!subscribers?.size) return false;
    subscribers.forEach(listener => {
      listener(payload);
    });
    return true;
  };

  return { publish, subscribe };
};

export const mapEvents = createEventBus<MapEvents>();
