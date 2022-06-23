import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import SegnalazioneCard from "../components/SegnalazioneCard";
import { useCurrentUser } from "../context/userContext";
import { ExtendedLocation } from "../location";

import { getSegnalazioni, removeSegnalazione } from "../services/segnalazioneService";

const Segnalazioni = () => {
  const navigate = useNavigate();
  const location = useLocation() as ExtendedLocation;
  const { currentUser } = useCurrentUser();
  const queryClient = useQueryClient();

  const segnalazioniQuery = useQuery("segnalazioniQuery", () => {
    return getSegnalazioni();
  });

  const removeSegnalazioneMutation = useMutation(
    async (data: string) => {
      return removeSegnalazione(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("segnalazioniQuery");
      },
    }
  );

  const removeSegnalazioneHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let id = e.currentTarget.dataset.segnalazioneid;
    if (!currentUser) {
      navigate("/login", { state: { previousPathname: location.pathname } });
      return;
    }
    if (id) {
      removeSegnalazioneMutation.mutate(id);
    }
  };

  if (segnalazioniQuery.isLoading || !segnalazioniQuery.data) {
    return <div className="h-full"></div>;
  }

  return (
    <div className="w-full h-full min-h-screen bg-light-grey py-10">
      {segnalazioniQuery.data.length > 0 ? (
        <main className="flex flex-col mx-auto items-center space-y-20">
          {segnalazioniQuery.data.map((segnalazione, i) => {
            return (
              <SegnalazioneCard key={i} {...segnalazione} onRemove={removeSegnalazioneHandler} />
            );
          })}
        </main>
      ) : (
        <main className="h-full w-full min-h-full text-center">
          <h3>Non ci sono segnalazioni aperte</h3>
        </main>
      )}
    </div>
  );
};

export default Segnalazioni;
