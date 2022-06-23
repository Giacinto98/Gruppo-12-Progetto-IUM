import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { Icon, LeafletMouseEvent, Map } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GestureHandling } from "leaflet-gesture-handling";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";

import { TAILWINDCSS_MD_BREAKPOINT } from "../constants/tailwind";
import useWindowSize from "../hooks/windowSize";

import homeMapMarkImg from "../assets/home-map-mark.svg";
import searchIcon from "../assets/search.svg";
import { EventoInfo } from "../services/eventService";
import { useCurrentUser } from "../context/userContext";
import { ExtendedLocation } from "../location";
import {
  addUserParticipatingEvent,
  getUserParticipatingStatus,
  removeUserParticipatingEvent,
} from "../services/profileService";
import MapEvent from "./MapEvent";

interface Props {
  events: EventoInfo[];
  onEventoSelected: (id: string | null) => void;
}

const MMap = ({ events, onEventoSelected }: Props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation() as ExtendedLocation;
  const { currentUser } = useCurrentUser();

  const [map, setMap] = useState<Map | undefined | null>(null);
  const mapSectionRef = useRef<HTMLDivElement | null>(null);

  const [initialEvent, setInitialEvent] = useState<EventoInfo | null | undefined>(
    searchParams.get("evento") ? events.find((e) => searchParams.get("evento") === e.id) : null
  );
  const [currentEvent, setCurrentEvent] = useState<EventoInfo | null | undefined>(null);

  const [windowWidth] = useWindowSize();

  const [participatingStatus, setParticipatingStatus] = useState(
    currentUser ? getUserParticipatingStatus(initialEvent ? initialEvent.id : "") : false
  );

  const scrollToEventSection = useCallback(() => {
    if (mapSectionRef.current) {
      const offset = windowWidth >= TAILWINDCSS_MD_BREAKPOINT ? 80 : 56;
      const y = mapSectionRef.current.getBoundingClientRect().bottom + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [windowWidth]);

  useEffect(() => {
    if (initialEvent) {
      setCurrentEvent(initialEvent);
      setInitialEvent(null);
      scrollToEventSection();
    }
  }, [initialEvent, scrollToEventSection]);

  const partecipaEventoHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!currentUser) {
      navigate("/login", {
        state: { previousPathname: `${location.pathname}?evento=${currentEvent?.id}` },
      });
      return;
    }
    if (currentEvent) {
      if (participatingStatus) {
        removeUserParticipatingEvent(currentEvent.id);
      } else {
        addUserParticipatingEvent(currentEvent.id);
      }
      setParticipatingStatus(getUserParticipatingStatus(currentEvent.id));
    }
  };

  const scrollToMapSection = () => {
    const offset = windowWidth >= TAILWINDCSS_MD_BREAKPOINT ? 200 : 70;
    if (mapSectionRef.current) {
      const y = mapSectionRef.current.getBoundingClientRect().top + (window.pageYOffset - offset);
      window.scrollTo({ top: y, behavior: "smooth" });
      mapSectionRef.current.focus();
    }
  };

  const markerClickHandler = (e: LeafletMouseEvent) => {
    let selectedEvent = events.find(
      (marker) => marker.n === e.latlng.lat && marker.e === e.latlng.lng
    );
    if (selectedEvent) {
      setCurrentEvent(selectedEvent);
      if (map) {
        map.flyTo(e.latlng);
        scrollToEventSection();
      }
      onEventoSelected(selectedEvent.id);
      if (currentUser) {
        setParticipatingStatus(getUserParticipatingStatus(selectedEvent.id));
      }
    }
  };

  const eventSectionClickHandler = () => {
    setCurrentEvent(null);
    scrollToMapSection();
    onEventoSelected(null);
  };

  const GestureHandlingSetter = () => {
    const map = useMap() as any;
    map.gestureHandling.enable();
    map.addHandler("gestureHandling", GestureHandling);
    return null;
  };

  return (
    <div className="w-full h-full relative">
      <section className="relative w-full h-full" ref={mapSectionRef}>
        <MapContainer
          center={[40.641991, 14.824107]}
          scrollWheelZoom={false}
          doubleClickZoom={true}
          ref={setMap}
          zoom={13}
        >
          <GestureHandlingSetter />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {events.map((event, i) => {
            return (
              <Marker
                position={[event.n, event.e]}
                eventHandlers={{ click: markerClickHandler }}
                icon={
                  new Icon({
                    iconUrl: homeMapMarkImg,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
                    popupAnchor: [0, -40], // point from which the popup should open relative to the iconAnchor
                  })
                }
                key={i}
              >
                <Popup>{event.name}</Popup>
              </Marker>
            );
          })}
        </MapContainer>
        <button
          className="absolute bottom-[20px] right-[20px] z-[40] primary"
          onClick={() => navigate("/segnala")}
        >
          Segnala un luogo
        </button>
        <div className="flex absolute top-[10px] left-[74px] z-[40] search-bar-container pr-2 w-[min(calc(100%-74px-8px-12px),400px)]">
          <input
            type="text"
            placeholder="Cerca un luogo o un evento"
            className="flex-1 search-bar"
          />
          <img src={searchIcon} alt="" aria-hidden="true" />
        </div>
      </section>

      {currentEvent && (
        <MapEvent
          currentEvent={currentEvent}
          onEventSectionClose={eventSectionClickHandler}
          onParticipateClick={partecipaEventoHandler}
          isUserParticipating={participatingStatus}
        />
      )}
    </div>
  );
};

export default MMap;
