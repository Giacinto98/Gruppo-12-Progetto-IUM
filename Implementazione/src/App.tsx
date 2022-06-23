import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import CandidaturaSponsor from "./pages/CandidaturaSponsor";
import Testimonianze from "./pages/Testimonianze";
import SegnalazioneLuogo from "./pages/SegnalazioneLuogo";
import InserimentoTestimonianza from "./pages/InserimentoTestimonianza";
import CreaEvento from "./pages/CreaEvento";
import Segnalazioni from "./pages/Segnalazioni";
import Home from "./pages/Home";
import DiventaOrganizzatore from "./pages/DiventaOrganizzatore";
import Evento from "./pages/Evento";
import { MotionConfig } from "framer-motion";
import smoothscroll from "smoothscroll-polyfill";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import Registrazione from "./pages/Registrazione";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 4,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  smoothscroll.polyfill();

  return (
    <MotionConfig reducedMotion="user">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <ScrollToTop>
            <Routes>
              <Route path="/profilo" element={<Profile />} />
              <Route path="/candidatura-sponsor" element={<CandidaturaSponsor />} />
              <Route path="/segnala" element={<SegnalazioneLuogo />} />
              <Route path="/segnalazioni" element={<Segnalazioni />} />
              <Route path="/crea-evento" element={<CreaEvento />} />
              <Route path="/testimonia/:idEvento" element={<InserimentoTestimonianza />} />
              <Route path="/testimonianze" element={<Testimonianze />} />
              <Route path="/organizzatore" element={<DiventaOrganizzatore />} />
              <Route path="/evento/:idEvento" element={<Evento />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/registrazione" element={<Registrazione />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </ScrollToTop>
        </BrowserRouter>
      </QueryClientProvider>
    </MotionConfig>
  );
}

export default App;
