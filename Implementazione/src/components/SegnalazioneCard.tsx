import Carousel from "./Carousel";
import mapMarkImg from "../assets/map-mark.svg";
import calendarImg from "../assets/calendar.svg";
import UserComment from "./UserComment";
import { useNavigate } from "react-router-dom";

interface Props {
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
  onRemove: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SegnalazioneCard = ({
  id,
  titolo,
  citta,
  via,
  civico,
  data,
  commentoUtente,
  nomeUtente,
  imgUtente,
  imgs,
  onRemove,
}: Props) => {
  const navigate = useNavigate();

  return (
    <article className="card p-4 md:p-10 flex flex-col space-y-10 md:space-y-10 w-[95%] max-w-[95%] md:max-w-[1000px]">
      <section className="grid grid-cols-1 grid-rows-[repeat(3,auto)] gap-y-5 lg:grid-cols-2 lg:grid-rows-[repeat(2,auto)] lg:gap-5">
        <section className="row-start-2 lg:row-start-1 lg:row-span-2">
          <Carousel imgs={imgs} />
        </section>

        <section className="flex flex-1 flex-col space-y-3">
          <h3 className="font-bold text-xl">{titolo}</h3>
          <div className="flex flex-col space-y-2">
            <div className="flex items-start space-x-2">
              <img src={mapMarkImg} alt="" aria-hidden="true" />
              <p className="">{via}</p>
            </div>
            <div className="flex space-x-2">
              <img src={calendarImg} alt="" aria-hidden="true" />
              <span className="">{data}</span>
            </div>
          </div>
        </section>

        <div className="flex flex-col md:items-end md:flex-row space-y-2 md:mt-0 md:space-x-5 md:mb-5 md:justify-end lg:justify-start">
          <button
            className="primary w-full md:w-auto"
            onClick={() =>
              navigate(`/crea-evento?citta=${citta}&via=${via}${civico ? `&civico=${civico}` : ""}`)
            }
          >
            Crea evento
          </button>
          <button className="delete w-full md:w-auto" onClick={onRemove} data-segnalazioneid={id}>
            Rimuovi
          </button>
        </div>
      </section>

      <UserComment name={nomeUtente} profileImg={imgUtente} comment={commentoUtente} />
    </article>
  );
};

export default SegnalazioneCard;
