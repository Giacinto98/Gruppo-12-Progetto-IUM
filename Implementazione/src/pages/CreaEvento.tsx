import { useState } from "react";
import { Formik } from "formik";
import { MultiSelect } from "react-multi-select-component";
import FileInput from "../components/FileInput";
import { Link, Navigate, useLocation, useSearchParams } from "react-router-dom";
import { ExtendedLocation } from "../location";
import { useCurrentUser } from "../context/userContext";

interface FormValues {
  nome: string;
  data: string;
  ora: string;
  numeroPartecipanti: string;
  sponsors: string;
  citta: string;
  via: string;
  civico: string;
  files: string;
}

interface MultiselectOption {
  value: any;
  label: string;
  key?: string;
  disabled?: boolean;
}

const CreaEvento = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation() as ExtendedLocation;
  const { currentUser } = useCurrentUser();
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<{ preview: string }[]>([]);
  const [selected, setSelected] = useState<MultiselectOption[]>([]);
  const initialFormValues = {
    nome: "",
    data: "",
    ora: "",
    numeroPartecipanti: "",
    sponsors: "",
    citta: searchParams.get("citta") || "",
    via: searchParams.get("via") || "",
    civico: searchParams.get("civico") || "",
    files: "",
  };

  const options = [
    { value: "hulu", label: "Hulu" },
    { value: "aprilia", label: "Aprilia" },
    { value: "netflix", label: "Netflix" },
    { value: "bmw", label: "BMW" },
    { value: "ciro", label: "Pizzeria Ciro" },
  ];

  const selectLocals = {
    allItemsAreSelected: "Tutti gli elementi selezionati",
    clearSearch: "Annulla",
    clearSelected: "Deseleziona tutto",
    noOptions: "Nessuna opzione",
    search: "Cerca",
    selectAll: "Seleziona tutto",
    selectAllFiltered: "Seleziona tutto (filtro)",
    selectSomeItems: "Seleziona gli sponsor...",
    create: "Crea",
  };

  if (!currentUser) {
    return (
      <Navigate
        to={"/login"}
        state={{ previousPathname: `${location.pathname}?${searchParams.toString()}` }}
      />
    );
  }

  if (submitted) {
    return (
      <div className="form-background min-h-full py-10 bg-primary-tint">
        <main className="card flex flex-col items-center lg:items-start p-6 md:p-[60px] max-w-[95%] md:max-w-2xl md:w-2xl mx-auto rounded-lg">
          <h2 className="self-start mb-8">L'evento è stato creato!</h2>
          <div className="space-y-5">
            <p>Potrai visualizzarlo sulla mappa.</p>
            <Link to="/" className="hover-underline-animation">
              Torna alla Home Page
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="form-background min-h-full py-10 bg-primary-tint">
      <main className="card flex flex-col items-center p-6 md:p-[60px] max-w-[95%] md:max-w-2xl md:w-2xl mx-auto rounded-lg">
        <h2 className="self-start mb-8">Crea un evento</h2>
        <Formik
          initialValues={initialFormValues}
          validate={(values: FormValues) => {
            const errors: Partial<FormValues> = {};
            if (!values.nome) {
              errors.nome = "Inserisci il nome dell'evento";
            }
            if (!values.data) {
              errors.data = "Inserisci la data";
            } else if (!values.data.match(/^\d{4}-\d{2}-\d{2}$/)) {
              errors.data = "Inserisci una data valida";
            }
            if (!values.ora) {
              errors.ora = "Inserisci l'ora";
            } else if (!values.ora.match(/^\d{2}:\d{2}$/)) {
              errors.ora = "Inserisci un'ora valida";
            }
            if (!values.numeroPartecipanti) {
              errors.numeroPartecipanti = "Inserisci il massimo numero di partecipanti";
            } else {
              if (parseInt(values.numeroPartecipanti) < 10) {
                errors.numeroPartecipanti =
                  "Inserici un numero di partecipanti valido (maggiore o uguale a 10)";
              }
            }
            if (!values.citta) {
              errors.citta = "Inserisci la città";
            }
            if (!values.via) {
              errors.via = "Inserisci la via";
            }
            if (selected.length === 0) {
              errors.sponsors = "Seleziona almeno uno sponsor";
            }
            if (files.length < 1) {
              errors.files = "Carica il file del tuo logo";
            }
            return errors;
          }}
          onSubmit={() => {
            setSubmitted(true);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mt-3">
                <label className="flex required" htmlFor="nome">
                  Nome evento
                </label>
                <input
                  className="input"
                  type="text"
                  name="nome"
                  id="nome"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nome}
                  aria-errormessage="nomeError"
                  aria-required="true"
                />
                {errors.nome && touched.nome && errors.nome && (
                  <div className="form-error" id="nomeError">
                    {errors.nome}
                  </div>
                )}
              </div>
              <div className="my-3 md:grid md:grid-cols-2 md:gap-5">
                <div className="my-3 md:my-0">
                  <label className="flex required" htmlFor="data">
                    Data
                  </label>
                  <input
                    className="input"
                    type="date"
                    name="data"
                    id="data"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.data}
                    aria-errormessage="dataError"
                    aria-required="true"
                  />
                  {errors.data && touched.data && errors.data && (
                    <div className="form-error" id="dataError">
                      {errors.data}
                    </div>
                  )}
                </div>
                <div className="my-3 md:my-0">
                  <label className="flex required" htmlFor="ora">
                    Ora
                  </label>
                  <input
                    className="input"
                    type="time"
                    name="ora"
                    id="ora"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ora}
                    aria-errormessage="oraError"
                    aria-required="true"
                  />
                  {errors.ora && touched.ora && errors.ora && (
                    <div className="form-error" id="oraError">
                      {errors.ora}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3">
                <label className="flex required" htmlFor="numeroPartecipanti">
                  Massimo numero di partecipanti
                </label>
                <input
                  className="input"
                  type="number"
                  name="numeroPartecipanti"
                  id="numeroPartecipanti"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.numeroPartecipanti}
                  aria-errormessage="numeroPartecipantiError"
                  aria-required="true"
                />
                {errors.numeroPartecipanti &&
                  touched.numeroPartecipanti &&
                  errors.numeroPartecipanti && (
                    <div className="form-error" id="numeroPartecipantiError">
                      {errors.numeroPartecipanti}
                    </div>
                  )}
              </div>
              <div className="my-3">
                <label className="flex required" htmlFor="sponsor">
                  Elenco sponsor
                </label>
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Seleziona gli sponsor"
                  overrideStrings={selectLocals}
                  aria-errormessage="sponsorError"
                  aria-required="true"
                />
                {errors.sponsors && touched.sponsors && errors.sponsors && selected.length < 1 && (
                  <div className="form-error" id="sponsorError">
                    {errors.sponsors}
                  </div>
                )}
              </div>
              <div className="mt-3">
                <label className="flex required" htmlFor="foto">
                  Carica foto
                </label>
                <FileInput
                  files={files}
                  setFiles={setFiles}
                  maxFiles={1}
                  id="foto"
                  aria-required="true"
                />
                {errors.files && touched.files && errors.files && files.length < 1 && (
                  <div className="form-error">{errors.files}</div>
                )}
              </div>
              <div className="mt-3">
                <label className="flex required" htmlFor="citta">
                  Città
                </label>
                <input
                  className="input"
                  type="text"
                  name="citta"
                  id="citta"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.citta}
                  aria-errormessage="cittaError"
                  aria-required="true"
                />
                {errors.citta && touched.citta && errors.citta && (
                  <div className="form-error" id="cittaError">
                    {errors.citta}
                  </div>
                )}
              </div>
              <div className="mt-3">
                <label className="flex required" htmlFor="via">
                  Via
                </label>
                <input
                  className="input"
                  type="text"
                  name="via"
                  id="via"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.via}
                  aria-errormessage="viaError"
                  aria-required="true"
                />
                {errors.via && touched.via && errors.via && (
                  <div className="form-error" id="viaError">
                    {errors.via}
                  </div>
                )}
              </div>
              <div className="mt-3">
                <label className="block" htmlFor="civico">
                  Civico
                </label>
                <input
                  className="input"
                  type="text"
                  name="civico"
                  id="civico"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.civico}
                  aria-errormessage="civicoError"
                />
                {errors.civico && touched.civico && errors.civico && (
                  <div className="form-error" id="civicoError">
                    {errors.civico}
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-10">
                <button className="primary w-full md:w-auto" type="submit">
                  Crea
                </button>
              </div>
            </form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default CreaEvento;
