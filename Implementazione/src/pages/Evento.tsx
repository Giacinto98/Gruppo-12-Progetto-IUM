import Carousel from "../components/Carousel";
import mapMarkImg from "../assets/map-mark.svg";
import calendarImg from "../assets/calendar.svg";
import timeImg from "../assets/time.svg";
import sponsorLogo from "../assets/pizzaciro.png";
import profileImg from "../assets/profilo.png";
import UserComment from "../components/UserComment";
import ProgressBar from "../components/ProgressBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { EventoComment, getEventoInfo } from "../services/eventService";
import { useRef, useState } from "react";
import { postLocalComment } from "../services/eventCommentService";
import { useCurrentUser } from "../context/userContext";
import { ExtendedLocation } from "../location";
import {
  addUserParticipatingEvent,
  getUserParticipatingStatus,
  removeUserParticipatingEvent,
} from "../services/profileService";
import { mapsSelector } from "../utils/mapsSelector";

const Evento = () => {
  const navigate = useNavigate();
  const location = useLocation() as ExtendedLocation;
  const { idEvento } = useParams();
  const { currentUser } = useCurrentUser();
  const [comment, setComment] = useState<string>("");
  const shareButtonRef = useRef<HTMLButtonElement | null>(null);
  const queryClient = useQueryClient();
  const eventInfoQuery = useQuery(
    "eventInfoQ",
    async () => {
      return await getEventoInfo(idEvento!);
    },
    { enabled: idEvento !== undefined }
  );

  const userPartecipatingStatus = useQuery(
    "userPartecipatingStatus",
    async () => {
      return getUserParticipatingStatus(idEvento!);
    },
    { enabled: idEvento !== undefined && currentUser !== null }
  );

  const addComment = useMutation(
    async (data: EventoComment) => {
      return await postLocalComment(idEvento!, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("eventInfoQ");
      },
    }
  );

  const addPartecipatingEvent = useMutation(
    async (data: string) => {
      return addUserParticipatingEvent(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userPartecipatingStatus");
      },
    }
  );

  const removePartecipatingEvent = useMutation(
    async (data: string) => {
      return removeUserParticipatingEvent(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userPartecipatingStatus");
      },
    }
  );

  const postCommentHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (comment.length <= 0) {
      return;
    }
    const commentData: EventoComment = {
      nome: "Francesca",
      img: profileImg,
      commento: comment,
      data: new Date().toLocaleString(),
    };
    addComment.mutate(commentData);
    setComment("");
  };

  const partecipaEventoHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!currentUser) {
      navigate("/login", { state: { previousPathname: location.pathname } });
      return;
    }
    const eventoId = e.currentTarget.dataset.eventoid;
    if (!userPartecipatingStatus.data) {
      if (eventoId) {
        addPartecipatingEvent.mutate(eventoId);
      }
    } else {
      if (eventoId) {
        removePartecipatingEvent.mutate(eventoId);
      }
    }
  };

  const shareEventoHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (
      shareButtonRef.current &&
      shareButtonRef.current.innerHTML === "Link copiato negli appunti"
    ) {
      return;
    }
    const shareData = {
      title: `GreenWorld - ${eventInfoQuery.data?.name}`,
      text: `${eventInfoQuery.data?.name} - Partecipa anche tu!`,
      url: document.location.href,
    };

    try {
      await navigator.share(shareData);
    } catch (err) {
      navigator.clipboard.writeText(shareData.url);
      e.currentTarget.innerHTML = "Link copiato negli appunti";
      setTimeout(() => {
        if (shareButtonRef && shareButtonRef.current) {
          shareButtonRef.current.innerHTML = "Condividi";
        }
      }, 4000);
    }
  };

  const directionsClickHandler = () => {
    if (eventInfoQuery && eventInfoQuery.data) {
      mapsSelector(eventInfoQuery.data.n, eventInfoQuery.data.e);
    }
  };

  if (eventInfoQuery.isLoading || !eventInfoQuery.data) {
    return <div className="h-full"></div>;
  }

  return (
    <div className="w-full h-full bg-light-grey py-10">
      <main className="min-h-[calc(100vh-80px)] card mx-auto px-4 py-10 w-[95%] max-w-[95%] md:max-w-[1600px] md:p-10">
        <section className="grid grid-cols-1 grid-rows-[repeat(3,auto)] gap-y-5 xl:grid-cols-2 xl:grid-rows-[repeat(2,auto)] lg:gap-10">
          <section className="row-start-2 xl:row-start-1 xl:row-span-2">
            <Carousel imgs={[eventInfoQuery.data.img]} />
          </section>

          <section className="flex flex-1 flex-col space-y-3">
            <h3 className="font-bold text-xl">{eventInfoQuery.data.name}</h3>

            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2">
                <img src={mapMarkImg} alt="" aria-hidden="true" />
                <span className="">{eventInfoQuery.data.indirizzo}</span>
              </div>
              <div className="flex space-x-2">
                <img src={calendarImg} alt="" aria-hidden="true" />
                <span className="">{eventInfoQuery.data.data}</span>
              </div>
              <div className="flex space-x-2">
                <img src={timeImg} alt="" aria-hidden="true" />
                <span className="">{eventInfoQuery.data.ora}</span>
              </div>
            </div>

            <p className="flex-1">{eventInfoQuery.data.descrizione}</p>

            <div>
              <h4>Partecipanti</h4>
              <ProgressBar
                total={eventInfoQuery.data.maxPartecipanti}
                completed={eventInfoQuery.data.partecipanti}
                showLabel={true}
              />
            </div>
          </section>

          {eventInfoQuery.data.concluso ? (
            <div className="md:mt-0 md:mb-5 text-center xl:text-left">
              <span className="font-semibold text-red-600">Questo evento è concluso</span>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:items-end md:justify-end xl:justify-start space-y-2 md:mt-0 md:space-x-5 md:mb-5">
              <button
                className={`${currentUser && userPartecipatingStatus.data ? "delete" : "primary"} `}
                onClick={partecipaEventoHandler}
                data-eventoid={eventInfoQuery.data.id}
              >
                {`${
                  currentUser && userPartecipatingStatus.data
                    ? "Rimuovi partecipazione"
                    : "Partecipa"
                }`}
              </button>
              <button className="secondary" onClick={shareEventoHandler} ref={shareButtonRef}>
                Condividi
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
          )}
        </section>

        <div className="separator w-full my-20"></div>

        <section className="flex flex-col items-center text-center space-y-5">
          <h3>Questo evento è sponsorizzato da</h3>

          <div className="grid grid-cols-[auto_auto] items-center gap-x-2 md:gap-x-10">
            <div className="flex flex-col items-center">
              <span className="font-semibold">Pizzeria da Ciro</span>
              <span className="text-xs">dal 1976</span>
              <span className="text-xs">Via Giovanni Nefasto, Genova, 83083</span>
              <span className="text-xs">pizzeriaciro.na - @ciroreal</span>
            </div>
            <img className="w-full max-w-[80px] max-h-[80px]" src={sponsorLogo} alt="" />
          </div>
        </section>

        <div className="separator w-full my-20"></div>

        {currentUser ? (
          <section>
            <div className="flex items-center space-x-5">
              <img className="profile-img" src={profileImg} alt="" />
              <h4 className="">Francesca</h4>
            </div>
            <form>
              <div className="md:pl-[100px] space-y-5">
                <div className="flex flex-col mt-4">
                  <label htmlFor="comment-input">Inserisci un commento</label>
                  <textarea
                    className="input lg:max-w-3xl h-40 md:h-20"
                    name="comment-input"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <button className="secondary  w-full lg:w-auto" onClick={postCommentHandler}>
                  Pubblica
                </button>
              </div>
            </form>
          </section>
        ) : (
          <section>
            <h4>Effettua il login per inserire un commento</h4>
          </section>
        )}

        {eventInfoQuery.data.comments && (
          <section className="flex flex-col space-y-10 mt-20 max-w-[1000px]">
            {eventInfoQuery.data.comments.map((comment, i) => {
              return (
                <UserComment
                  key={i}
                  name={comment.nome}
                  profileImg={comment.img}
                  comment={comment.commento}
                  data={comment.data}
                />
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
};

export default Evento;
