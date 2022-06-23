import { EventoInfo, getConcludedEvents } from "./eventService";
import profileImg from "../assets/profile-img.png";
import testA from "../assets/a.jpg";
import testB from "../assets/b.jpg";
import { EVENT_TESTIMONIANZE } from "./storageKeys";

export interface EventTestimonianza extends Pick<EventoInfo, "id" | "indirizzo"> {
  profileImg: string;
  nomeUtente: string;
  nomeEvento: string;
  dataEvento: string;
  dataTestimonianza: string;
  comment: string;
  imgs: string[];
}

export const defaultTestimonianzaImages = [
  testA,
  testB,
  testA,
  testB,
  testA,
  testB,
  testA,
  testB,
  testA,
  testB,
];

const defaultTestimonianze = getConcludedEvents().map((event) => {
  return {
    profileImg: profileImg,
    nomeUtente: "Marge",
    nomeEvento: event.name,
    indirizzo: event.indirizzo,
    dataEvento: event.data,
    dataTestimonianza: new Date().toLocaleString(),
    comment:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    imgs: defaultTestimonianzaImages,
    id: event.id,
  } as EventTestimonianza;
});

const getLocalTestimonianze = () => {
  const testimonianze = localStorage.getItem(EVENT_TESTIMONIANZE);
  if (testimonianze) {
    const t = JSON.parse(testimonianze) as EventTestimonianza[];
    return t;
  }
  return [] as EventTestimonianza[];
};

const postLocalTestimonianza = (testimonianza: EventTestimonianza) => {
  const testimonianze = localStorage.getItem(EVENT_TESTIMONIANZE);
  if (testimonianze) {
    let t = JSON.parse(testimonianze) as EventTestimonianza[];
    t = [testimonianza, ...t];
    localStorage.setItem(EVENT_TESTIMONIANZE, JSON.stringify(t));
  } else {
    const t = [testimonianza];
    localStorage.setItem(EVENT_TESTIMONIANZE, JSON.stringify(t));
  }
};

export const getTestimonianze = () => {
  return [...getLocalTestimonianze(), ...defaultTestimonianze];
};

export const postTestimonianza = (testimonianza: EventTestimonianza) => {
  postLocalTestimonianza(testimonianza);
};
