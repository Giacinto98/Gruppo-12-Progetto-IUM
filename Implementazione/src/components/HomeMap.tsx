import Map from "./Map";
import { getActiveEvents } from "../services/eventService";
import { useQuery } from "react-query";

const HomeMap = () => {
  const activeEventsQuery = useQuery("activeEvents", getActiveEvents);

  const handleEventoSelected = (id: string | null) => {
    const param = id !== null ? `?evento=${id}` : "/";
    window.history.replaceState("", "", param);
  };

  if (activeEventsQuery.isLoading || !activeEventsQuery.data) {
    return <div className="h-full"></div>;
  }

  return <Map events={activeEventsQuery.data} onEventoSelected={handleEventoSelected} />;
};

export default HomeMap;
