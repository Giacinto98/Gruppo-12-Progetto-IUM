import profileImg from "../assets/profile-img.png";
import testA from "../assets/a.jpg";
import testB from "../assets/b.jpg";
import { CURRENT_SEGNALAZIONE_ID, REMOVED_SEGNALAZIONI, SEGNALAZIONI } from "./storageKeys";

export interface Segnalazione {
  id: string;
  titolo: string;
  citta: string;
  via: string;
  civico?: string;
  data: string;
  commentoUtente: string;
  nomeUtente: string;
  imgUtente: string;
  imgs: string[];
}

const defaultCommentoUtente =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad porro beatae quis architecto. Aspernatur, itaque natus numquam delectus eligendi quasi libero accusamus! Delectus asperiores aut quis error expedita sit sapiente itaque vero. Consectetur ad vel illum modi dicta laborum rerum! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad porro beatae quis architecto. Aspernatur, itaque natus numquam delectus eligendi quasi libero accusamus! Delectus asperiores aut quis error expedita sit sapiente itaque vero. Consectetur ad vel illum modi dicta laborum rerum!";

const defaultSegnalazioneImgs = [testA, testB];

const defaultSegnalazioni: Segnalazione[] = Array<Segnalazione>(10)
  .fill({} as Segnalazione)
  .map((_, i) => {
    return {
      id: `${i}`,
      titolo: `Segnalazione urgente ${i}`,
      citta: "Milano",
      via: "via del monte",
      civico: "12",
      data: "15/03/2022",
      commentoUtente: defaultCommentoUtente,
      nomeUtente: "Marge",
      imgUtente: profileImg,
      imgs: defaultSegnalazioneImgs,
    };
  });

const getRemovedSegnalazioni = () => {
  const segnalazioni = localStorage.getItem(REMOVED_SEGNALAZIONI);
  return segnalazioni ? (JSON.parse(segnalazioni) as string[]) : ([] as string[]);
};

const getLocalSegnalazioni = () => {
  const segnalazioni = localStorage.getItem(SEGNALAZIONI);
  if (segnalazioni) {
    const s = JSON.parse(segnalazioni) as Segnalazione[];
    return s;
  }
  return [] as Segnalazione[];
};

const postLocalSegnalazione = (segnalazione: Segnalazione) => {
  const segnalazioni = localStorage.getItem(SEGNALAZIONI);
  if (segnalazioni) {
    let s = JSON.parse(segnalazioni) as Segnalazione[];
    s = [segnalazione, ...s];
    localStorage.setItem(SEGNALAZIONI, JSON.stringify(s));
  } else {
    localStorage.setItem(SEGNALAZIONI, JSON.stringify([segnalazione]));
  }
};

export const getNextSegnalazioneId = () => {
  const currentId = localStorage.getItem(CURRENT_SEGNALAZIONE_ID);
  let nextId = currentId
    ? parseInt(JSON.parse(currentId) as string) + 1
    : defaultSegnalazioni.length + 1;
  localStorage.setItem(CURRENT_SEGNALAZIONE_ID, JSON.stringify(nextId));
  return nextId.toString();
};

export const getDefaultSegnalazioneImgs = () => {
  return defaultSegnalazioneImgs;
};

export const postSegnalazione = (segnalazione: Segnalazione) => {
  postLocalSegnalazione(segnalazione);
};

export const getSegnalazioni = () => {
  const removedSegnalazioni = getRemovedSegnalazioni();
  return [...getLocalSegnalazioni(), ...defaultSegnalazioni].filter(
    (segnalazione) => !removedSegnalazioni.includes(segnalazione.id)
  );
};

export const removeSegnalazione = (idSegnalazione: string) => {
  const removedSegnalazioni = localStorage.getItem(REMOVED_SEGNALAZIONI);
  if (removedSegnalazioni) {
    const s = JSON.parse(removedSegnalazioni) as string[];
    s.push(idSegnalazione);
    localStorage.setItem(REMOVED_SEGNALAZIONI, JSON.stringify(s));
  } else {
    const s = [idSegnalazione];
    localStorage.setItem(REMOVED_SEGNALAZIONI, JSON.stringify(s));
  }
};
