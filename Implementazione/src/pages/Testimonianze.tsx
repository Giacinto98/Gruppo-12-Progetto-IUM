import { useQuery } from "react-query";
import TestimonianzaCard from "../components/TestimonianzaCard";
import { getTestimonianze } from "../services/eventTestimonianzaService";

const Testimonianze = () => {
  const testimonianzeQuery = useQuery("testimonianzeQuery", () => {
    return getTestimonianze();
  });

  if (testimonianzeQuery.isLoading || !testimonianzeQuery.data) {
    return <div className="h-full"></div>;
  }

  return (
    <div className="w-full h-full bg-light-grey py-10">
      <main className="flex flex-col mx-auto items-center space-y-20">
        {testimonianzeQuery.data.map((testimonianza, i) => {
          return <TestimonianzaCard key={i} {...testimonianza} />;
        })}
      </main>
    </div>
  );
};

export default Testimonianze;
