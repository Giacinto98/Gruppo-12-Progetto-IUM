import { EVENT_COMMENTS } from "./storageKeys";

export interface EventoComment {
  nome: string;
  img: string;
  commento: string;
  data: string;
}

interface EventiComments {
  id: string;
  comments: EventoComment[];
}

export const getLocalEventComments = (idEvento: string) => {
  const comments = localStorage.getItem(EVENT_COMMENTS);
  if (comments) {
    const events = JSON.parse(comments) as EventiComments[];
    const idx = events.findIndex((event) => event.id === idEvento);
    if (idx !== -1) {
      return events[idx].comments;
    }
  }
  return [] as EventoComment[];
};

export const postLocalComment = async (idEvento: string, comment: EventoComment) => {
  const comments = localStorage.getItem(EVENT_COMMENTS);
  if (comments) {
    const events = JSON.parse(comments) as EventiComments[];

    const idx = events.findIndex((event) => event.id === idEvento);

    if (idx === -1) {
      events.push({
        id: idEvento,
        comments: [comment],
      });
    } else {
      events[idx].comments = [comment, ...events[idx].comments];
    }

    const updatedEvents = JSON.stringify(events);
    localStorage.setItem(EVENT_COMMENTS, updatedEvents);
  } else {
    const ec = [
      {
        id: idEvento,
        comments: [comment],
      },
    ];
    localStorage.setItem(EVENT_COMMENTS, JSON.stringify(ec));
  }
};
