import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

import mapMarkImg from "../assets/map-mark.svg";
import calendarImg from "../assets/calendar.svg";
import timeImg from "../assets/time.svg";
import close from "../assets/delete.svg";
import sponsorLogo from "../assets/pizzaciro.png";

import { EventoInfo } from "../services/eventService";
import { mapsSelector } from "../utils/mapsSelector";

interface Props {
  currentEvent: EventoInfo;
  onEventSectionClose: () => void;
  onParticipateClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isUserParticipating: boolean;
}

const MapEvent = ({
  currentEvent,
  onEventSectionClose,
  onParticipateClick,
  isUserParticipating,
}: Props) => {
  const navigate = useNavigate();

  const directionsClickHandler = () => {
    mapsSelector(currentEvent.n, currentEvent.e);
  };

  return (
    <div className="bg-light-grey pb-5" id="sezione-evento">
      <section className="card xl:max-w-[78.125rem] xl:mx-auto mx-5 p-5">
        <section className="relative ">
          <div
            className="absolute -top-3 -right-3 md:top-[5px] md:right-[5px] cursor-pointer"
            onClick={onEventSectionClose}
            role="button"
            aria-label="Chiudi la sezione dell'evento"
            aria-controls="sezione-evento"
          >
            <img src={close} className="w-[14px] h-[14px]" alt="" aria-hidden="true" />
          </div>
          <h3 className="w-full mx-auto text-center py-5 mb-5">{currentEvent.name}</h3>
          <section className="grid grid-cols-1 md:grid-cols-[60%_auto] grid-rows-[auto_1fr] md:grid-rows-1 w-full lg:max-w-[78.125rem] mx-auto gap-x-5 lg:gap-x-5">
            <section className="flex items-center justify-center">
              <img
                src={currentEvent.img}
                className="h-auto w-auto rounded-lg"
                alt={currentEvent.altImg}
              />
            </section>
            <section className="flex flex-col py-5 space-y-5 lg:justify-center md:space-y-2 lg:space-y-3">
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2">
                  <img src={mapMarkImg} alt="" aria-hidden="true" />
                  <span>{currentEvent.indirizzo}</span>
                </div>
                <div className="flex space-x-2">
                  <img src={calendarImg} alt="" aria-hidden="true" />
                  <span>{currentEvent.data}</span>
                </div>
                <div className="flex space-x-2">
                  <img src={timeImg} alt="" aria-hidden="true" />
                  <span>{currentEvent.ora}</span>
                </div>
              </div>
              <div>
                <h4>Partecipanti</h4>
                <ProgressBar
                  total={currentEvent.maxPartecipanti}
                  completed={currentEvent.partecipanti}
                  showLabel={true}
                />
              </div>
              <div className="flex flex-col space-y-2 flex-1 justify-end">
                <button
                  className={`${isUserParticipating ? "delete" : "primary"}`}
                  onClick={onParticipateClick}
                  data-eventoid={currentEvent.id}
                >
                  {`${isUserParticipating ? "Rimuovi partecipazione" : "Partecipa"}`}
                </button>
                <button
                  className="secondary"
                  id={currentEvent.id}
                  onClick={() => navigate(`/evento/${currentEvent.id}`)}
                >
                  Maggiori informazioni
                </button>
                <button className="secondary external" onClick={directionsClickHandler}>
                  Indicazioni stradali
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 14"
                    width="16"
                    height="16"
                    className="ml-2"
                    aria-hidden="true"
                  >
                    <g>
                      <path
                        d="M13.5,8v4.5a1,1,0,0,1-1,1H1.5a1,1,0,0,1-1-1V1.5a1,1,0,0,1,1-1H6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <polyline
                        points="10 0.5 13.5 0.5 13.5 4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></polyline>
                      <line
                        x1="13.5"
                        y1="0.5"
                        x2="7"
                        y2="7"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></line>
                    </g>
                  </svg>
                </button>
              </div>
            </section>
          </section>
        </section>
        {currentEvent.sponsors && (
          <>
            <div className="separator lg:max-w-[78.125rem] mx-auto mt-5 mb-10 lg:my-10"></div>
            <section className="flex flex-col items-center space-y-5 text-center">
              <h3>Questo evento è sponsorizzato da</h3>
              {currentEvent.sponsors.map((sponsor, i) => {
                return (
                  <div
                    className="grid grid-cols-[auto_auto] items-center gap-x-2 md:gap-x-10"
                    key={i}
                  >
                    <div className="flex flex-col items-center">
                      <span className="font-semibold">{sponsor.nome}</span>
                      <span className="text-xs">{sponsor.testo}</span>
                      <span className="text-xs">{sponsor.indirizzo}</span>
                      <span className="text-xs">{sponsor.info}</span>
                    </div>
                    <img
                      className="w-full max-w-[80px] max-h-[80px]"
                      src={sponsorLogo}
                      alt="logo dello sponsor"
                    />
                  </div>
                );
              })}
            </section>
          </>
        )}
      </section>
    </div>
  );
};

export default MapEvent;
