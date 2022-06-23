import profileImg from "../assets/profilo.png";
import EventoProfilo from "../components/EventoProfilo";
import ProgressBar from "../components/ProgressBar";
import giftImg from "../assets/gift.svg";

import { useLocation, Navigate } from "react-router-dom";
import { useCurrentUser } from "../context/userContext";
import { useQuery } from "react-query";
import { getUserParticipatedEvents, getUserParticipatingEvents } from "../services/profileService";
import { ExtendedLocation } from "../location";

const Profile = () => {
  const location = useLocation() as ExtendedLocation;
  const { currentUser } = useCurrentUser();
  const userPartecipatedEventsQuery = useQuery("userPartecipatedEvents", getUserParticipatedEvents);
  const userPartecipatingEventsQuery = useQuery(
    "userPartecipatingEvents",
    getUserParticipatingEvents
  );
  const eventiPerPremio = 100;

  if (!currentUser) {
    return (
      <Navigate
        to={location.state?.previousPathname ? location.state.previousPathname : "/"}
        state={{ previousPathname: location.pathname }}
      />
    );
  }

  if (userPartecipatedEventsQuery.isLoading || !userPartecipatedEventsQuery.data) {
    return <div className="h-full"></div>;
  }

  return (
    <div className="w-full h-full bg-light-grey py-10">
      <main className="min-h-[calc(100vh-80px)] card mx-auto px-4 py-10 w-[95%] max-w-[95%] md:max-w-[1600px] md:p-10">
        <section className="grid grid-cols-1 xl:grid-cols-[70%_30%] grid-rows-[1fr_auto_auto] xl:grid-rows-1">
          <section className="flex flex-col w-full md:flex-row space-y-10 md:space-x-10 md:space-y-0 items-center mx-auto lg:mx-0">
            <img src={profileImg} alt="immagine del profilo" />
            <section className="flex flex-col w-full md:w-auto items-center md:items-start space-y-5">
              <h3>{`${currentUser.nome} ${currentUser.cognome}`}</h3>
              <div className="grid w-full grid-cols-[1fr_auto] md:grid-rows-2 grid-rows-3 gap-x-5">
                <span className="username-label font-semibold">Username</span>
                <span className="username">{currentUser.username}</span>
                <span className="email-label font-semibold">Email</span>
                <span className="email">{currentUser.email}</span>
                <span className="community-label font-semibold">Nella community</span>
                <span className="community">{currentUser.dataRegistrazione}</span>
              </div>
              <button className="secondary w-full xl:w-auto">Modifica informazioni</button>
            </section>
          </section>
          <div className="separator my-20 xl:hidden"></div>
          <section className="flex flex-col md:self-center md:justify-self-end w-full">
            <h4 className="text-center mb-10 md:text-left md:mb-0">Punteggio conseguito</h4>
            <div className="flex items-center space-x-10">
              <ProgressBar
                total={eventiPerPremio}
                completed={userPartecipatedEventsQuery.data.length}
                showLabel={true}
              />
              <img src={giftImg} alt="pacco regalo" />
            </div>
          </section>
        </section>
        <div className="separator w-full my-20"></div>
        {userPartecipatingEventsQuery.data && userPartecipatingEventsQuery.data.length > 0 ? (
          <section>
            <h4 className="text-center mb-10 md:text-left">
              Hai confermato la partecipazione a {userPartecipatingEventsQuery.data.length} event
              {userPartecipatingEventsQuery.data.length > 1 ? "i" : "o"}
            </h4>
            <div className="flex flex-col space-y-20 lg:space-y-10">
              {userPartecipatingEventsQuery.data.map((evento, i) => (
                <EventoProfilo
                  key={i}
                  img={evento.img}
                  altImg={evento.altImg}
                  date={evento.data}
                  description={evento.descrizione}
                  location={evento.indirizzo}
                  nome={evento.name}
                  id={evento.id}
                  testimonianza={false}
                />
              ))}
            </div>
          </section>
        ) : (
          <section>
            <h4 className="text-center mb-10 md:text-left">
              Gli eventi a cui parteciperai compariranno qui
            </h4>
          </section>
        )}

        <div className="separator w-full my-20"></div>
        {userPartecipatedEventsQuery.data && userPartecipatedEventsQuery.data.length > 0 ? (
          <section>
            <h4 className="text-center mb-10 md:text-left">
              Hai partecipato a {userPartecipatedEventsQuery.data.length} event
              {userPartecipatedEventsQuery.data.length > 1 ? "i" : "o"}
            </h4>
            <div className="flex flex-col space-y-20 lg:space-y-10">
              {userPartecipatedEventsQuery.data.map((evento, i) => (
                <EventoProfilo
                  key={i}
                  img={evento.img}
                  altImg={evento.altImg}
                  date={evento.data}
                  description={evento.descrizione}
                  location={evento.indirizzo}
                  nome={evento.name}
                  id={evento.id}
                  testimonianza={true}
                />
              ))}
            </div>
          </section>
        ) : (
          <section>
            <h4 className="text-center mb-10 md:text-left">
              Gli eventi a cui hai partecipato compariranno qui
            </h4>
          </section>
        )}
      </main>
    </div>
  );
};

export default Profile;
