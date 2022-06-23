import mapMarkImg from "../assets/map-mark.svg";
import calendarImg from "../assets/calendar.svg";
import ScrollableContainer from "./ScrollableContainer";
import useWindowSize from "../hooks/windowSize";
import { TAILWINDCSS_LG_BREAKPOINT } from "../constants/tailwind";
import { useNavigate } from "react-router-dom";

interface Props {
  profileImg: string;
  nomeUtente: string;
  dataEvento: string;
  dataTestimonianza: string;
  nomeEvento: string;
  comment: string;
  imgs?: string[];
  id: string;
  indirizzo: string;
}

const TestimonianzaCard = ({
  profileImg,
  nomeUtente,
  indirizzo,
  dataEvento,
  comment,
  imgs,
  nomeEvento,
  dataTestimonianza,
  id,
}: Props) => {
  const navigate = useNavigate();
  const [width] = useWindowSize();

  return (
    <article className="card flex flex-col space-y-8 md:space-y-5 p-4 md:p-10 w-[95%] max-w-[95%] md:max-w-[1000px]">
      <header className="flex items-center space-x-5">
        <img className="profile-img" src={profileImg} alt="" />
        <div className="flex flex-col text-xs">
          <h4>{nomeUtente}</h4>
          <span>{dataTestimonianza}</span>
        </div>
      </header>
      <section className="flex flex-col md:flex-row items-start md:items-center space-y-10 md:space-y-0 md:space-x-10">
        <div className="flex flex-col space-y-2">
          <h5 className="font-semibold">{nomeEvento}</h5>
          <div className="flex space-x-2">
            <img src={mapMarkImg} alt="" aria-hidden="true" />
            <span className="">{indirizzo}</span>
          </div>
          <div className="flex space-x-2">
            <img src={calendarImg} alt="" aria-hidden="true" />
            <span className="">{dataEvento}</span>
          </div>
        </div>
      </section>
      {imgs && imgs.length > 0 && (
        <section className="w-full">
          <ScrollableContainer
            slidesPerView={width > TAILWINDCSS_LG_BREAKPOINT ? 3 : 1}
            imgs={imgs}
          />
        </section>
      )}
      <section className="flex flex-col-reverse md:flex-col">
        <p className="mt-5 md:mt-0 md:mb-5">{comment}</p>
        <button
          className="primary w-full md:w-auto ml-auto"
          onClick={() => navigate(`/evento/${id}`)}
        >
          Vedi evento
        </button>
      </section>
    </article>
  );
};

export default TestimonianzaCard;
