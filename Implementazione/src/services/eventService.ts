import eventImage from "../assets/a.jpg";
import sponsorLogo from "../assets/pizzaciro.png";
import commentProfileImg from "../assets/profile-img.png";
import { getLocalEventComments } from "./eventCommentService";

export interface EventoComment {
  nome: string;
  img: string;
  commento: string;
  data: string;
}

export interface EventoSponsor {
  nome: string;
  testo: string;
  indirizzo: string;
  info: string;
  logo: string;
}

export interface EventoInfo {
  id: string;
  concluso: boolean;
  n: number;
  e: number;
  name: string;
  partecipanti: number;
  maxPartecipanti: number;
  ora: string;
  indirizzo: string;
  data: string;
  img: string;
  altImg: string;
  descrizione: string;
  sponsors?: EventoSponsor[];
  comments?: EventoComment[];
}

const defaultComments = Array<EventoComment>(10).fill({
  nome: "Marge",
  img: commentProfileImg,
  commento:
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat.",
  data: new Date().toLocaleString(),
});

const defaultSponsors = [
  {
    nome: "Pizzeria da Ciro",
    testo: "dal 1976",
    indirizzo: "Via Giovanni Nefasto, Genova, 83083",
    info: "pizzeriaciro.na - @ciroreal",
    logo: sponsorLogo,
  },
];

export const defaultEventi: EventoInfo[] = [
  {
    id: "0",
    concluso: false,
    n: 40.641991,
    e: 14.824107,
    name: "Evento sul fiume Sarno",
    partecipanti: 45,
    maxPartecipanti: 150,
    ora: "15:30",
    indirizzo: "Sarno",
    data: "15/03/2022",
    img: eventImage,
    altImg: "",
    descrizione:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    sponsors: defaultSponsors,
    comments: defaultComments,
  },
  {
    id: "1",
    concluso: false,
    n: 40.64,
    e: 14.843801,
    name: "Evento 1",
    partecipanti: 40,
    maxPartecipanti: 150,
    ora: "15:30",
    indirizzo: "Sarno",
    data: "15/03/2022",
    img: eventImage,
    altImg: "",
    descrizione:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    sponsors: defaultSponsors,
    comments: defaultComments,
  },
  {
    id: "2",
    concluso: true,
    n: 40.96,
    e: 14.863901,
    name: "Evento 2",
    partecipanti: 40,
    maxPartecipanti: 150,
    ora: "15:30",
    indirizzo: "Sarno",
    data: "15/03/2022",
    img: eventImage,
    altImg: "",
    descrizione:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    sponsors: defaultSponsors,
    comments: defaultComments,
  },
  {
    id: "3",
    concluso: true,
    n: 40.96,
    e: 14.863901,
    name: "Evento 3",
    partecipanti: 40,
    maxPartecipanti: 150,
    ora: "15:30",
    indirizzo: "Sarno",
    data: "15/03/2022",
    img: eventImage,
    altImg: "",
    descrizione:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    sponsors: defaultSponsors,
    comments: defaultComments,
  },
  {
    id: "4",
    concluso: true,
    n: 40.96,
    e: 14.863901,
    name: "Evento 4",
    partecipanti: 40,
    maxPartecipanti: 150,
    ora: "15:30",
    indirizzo: "Sarno",
    data: "15/03/2022",
    img: eventImage,
    altImg: "",
    descrizione:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    sponsors: defaultSponsors,
    comments: defaultComments,
  },
  {
    id: "5",
    concluso: true,
    n: 40.96,
    e: 14.863901,
    name: "Evento 5",
    partecipanti: 40,
    maxPartecipanti: 150,
    ora: "15:30",
    indirizzo: "Sarno",
    data: "15/03/2022",
    img: eventImage,
    altImg: "",
    descrizione:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    sponsors: defaultSponsors,
    comments: defaultComments,
  },
  {
    id: "6",
    concluso: true,
    n: 40.96,
    e: 14.863901,
    name: "Evento 6",
    partecipanti: 40,
    maxPartecipanti: 150,
    ora: "15:30",
    indirizzo: "Sarno",
    data: "15/03/2022",
    img: eventImage,
    altImg: "",
    descrizione:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    sponsors: defaultSponsors,
    comments: defaultComments,
  },
  {
    id: "7",
    concluso: true,
    n: 40.96,
    e: 14.863901,
    name: "Evento 7",
    partecipanti: 40,
    maxPartecipanti: 150,
    ora: "15:30",
    indirizzo: "Sarno",
    data: "15/03/2022",
    img: eventImage,
    altImg: "",
    descrizione:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    sponsors: defaultSponsors,
    comments: defaultComments,
  },
  {
    id: "8",
    concluso: true,
    n: 40.96,
    e: 14.863901,
    name: "Evento 8",
    partecipanti: 40,
    maxPartecipanti: 150,
    ora: "15:30",
    indirizzo: "Sarno",
    data: "15/03/2022",
    img: eventImage,
    altImg: "",
    descrizione:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    sponsors: defaultSponsors,
    comments: defaultComments,
  },
  {
    id: "9",
    concluso: true,
    n: 40.96,
    e: 14.863901,
    name: "Evento 9",
    partecipanti: 40,
    maxPartecipanti: 150,
    ora: "15:30",
    indirizzo: "Sarno",
    data: "15/03/2022",
    img: eventImage,
    altImg: "",
    descrizione:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    sponsors: defaultSponsors,
    comments: defaultComments,
  },
  {
    id: "10",
    concluso: true,
    n: 40.96,
    e: 14.863901,
    name: "Evento 10",
    partecipanti: 40,
    maxPartecipanti: 150,
    ora: "15:30",
    indirizzo: "Sarno",
    data: "15/03/2022",
    img: eventImage,
    altImg: "",
    descrizione:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    sponsors: defaultSponsors,
    comments: defaultComments,
  },
  {
    id: "11",
    concluso: true,
    n: 40.96,
    e: 14.863901,
    name: "Evento 11",
    partecipanti: 40,
    maxPartecipanti: 150,
    ora: "15:30",
    indirizzo: "Sarno",
    data: "15/03/2022",
    img: eventImage,
    altImg: "",
    descrizione:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    sponsors: defaultSponsors,
    comments: defaultComments,
  },
  {
    id: "12",
    concluso: true,
    n: 40.96,
    e: 14.863901,
    name: "Evento 12",
    partecipanti: 40,
    maxPartecipanti: 150,
    ora: "15:30",
    indirizzo: "Sarno",
    data: "15/03/2022",
    img: eventImage,
    altImg: "",
    descrizione:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    sponsors: defaultSponsors,
    comments: defaultComments,
  },
];

export const getEventsInfoByIds = (ids: string[]) => {
  const filteredEvents = defaultEventi.filter((e) => ids.includes(e.id));
  return filteredEvents;
};

export const getEventoInfo = async (id: string) => {
  const idx = defaultEventi.findIndex((evento) => evento.id === id);
  defaultEventi[idx].comments = [...getLocalEventComments(id), ...defaultComments];
  return defaultEventi[idx];
};

export const getActiveEvents = () => {
  return defaultEventi.filter((evento) => !evento.concluso);
};

export const getConcludedEvents = () => {
  return defaultEventi.filter((evento) => evento.concluso);
};
