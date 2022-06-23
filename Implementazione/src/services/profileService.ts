import { getConcludedEvents, getEventsInfoByIds } from "./eventService";
import { PARTICIPATING_EVENTS } from "./storageKeys";

const getLocalParticipatingEvents = () => {
  const events = localStorage.getItem(PARTICIPATING_EVENTS);
  if (events) {
    const parsedEvents = JSON.parse(events) as string[];
    return parsedEvents;
  }
  return [] as string[];
};

const addLocalParticipatingEvent = (idEvento: string) => {
  const events = localStorage.getItem(PARTICIPATING_EVENTS);
  if (events) {
    const parsedEvents = JSON.parse(events) as string[];
    if (!parsedEvents.includes(idEvento)) {
      parsedEvents.push(idEvento);
      localStorage.setItem(PARTICIPATING_EVENTS, JSON.stringify(parsedEvents));
    }
  } else {
    localStorage.setItem(PARTICIPATING_EVENTS, JSON.stringify([idEvento]));
  }
};

const removeLocalParticipatingEvent = (idEvento: string) => {
  const events = localStorage.getItem(PARTICIPATING_EVENTS);
  if (events) {
    const parsedEvents = JSON.parse(events) as string[];
    const filteredEvents = parsedEvents.filter((id) => id !== idEvento);
    localStorage.setItem(PARTICIPATING_EVENTS, JSON.stringify(filteredEvents));
  }
};

export const defaultParticipatedEvents = getConcludedEvents();

export const getUserParticipatingStatus = (idEvento: string) => {
  return getUserParticipatingEvents().filter((e) => e.id === idEvento).length > 0;
};

export const removeUserParticipatingEvent = (idEvento: string) => {
  removeLocalParticipatingEvent(idEvento);
};

export const addUserParticipatingEvent = (idEvento: string) => {
  addLocalParticipatingEvent(idEvento);
};

export const getUserParticipatingEvents = () => {
  return getEventsInfoByIds(getLocalParticipatingEvents());
};

export const getUserParticipatedEvents = () => {
  return defaultParticipatedEvents;
};
