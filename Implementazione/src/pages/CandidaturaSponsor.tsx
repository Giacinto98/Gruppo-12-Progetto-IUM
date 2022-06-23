import { useState } from "react";
import { Formik } from "formik";
import FileInput from "../components/FileInput";
import { Link } from "react-router-dom";

interface FormValues {
  nomeAzienda: string;
  referenze: string;
  email: string;
  telefono: string;
  url: string;
  files: string;
}

const CandidaturaSponsor = () => {
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<{ preview: string }[]>([]);
  const initialFormValues: FormValues = {
    nomeAzienda: "",
    referenze: "",
    email: "",
    telefono: "",
    url: "",
    files: "",
  };

  if (submitted) {
    return (
      <div className="form-background min-h-full py-10 bg-primary-tint">
        <main className="card flex flex-col items-center lg:items-start p-6 md:p-[60px] max-w-[95%] md:max-w-2xl md:w-2xl mx-auto rounded-lg">
          <h2 className="self-start mb-8">Ti ringraziamo per aver inviato la tua candidatura!</h2>
          <div className="space-y-5">
            <p>Un membro della nostra community ti contatterà al più presto.</p>
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
        <h2 className="self-start mb-8">Candidati come sponsor</h2>
        <Formik
          initialValues={initialFormValues}
          validate={(values: FormValues) => {
            const errors: Partial<FormValues> = {};
            if (!values.nomeAzienda) {
              errors.nomeAzienda = "Inserisci il nome della tua azienda";
            }
            if (!values.referenze) {
              errors.referenze = "Inserisci le tue referenze";
            }
            if (!values.email) {
              errors.email = "Inserisci l'email della tua azienda";
            }
            if (!values.telefono) {
              errors.telefono = "Inserisci il telefono della tua azienda";
            }
            if (!values.url) {
              errors.url = "Inserisci l'url del sito web della tua azienda";
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
                <label className="flex required" htmlFor="nomeAzienda">
                  Nome azienda
                </label>
                <input
                  className="input"
                  type="text"
                  name="nomeAzienda"
                  id="nomeAzienda"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nomeAzienda}
                  aria-errormessage="nomeAziendaError"
                  aria-required="true"
                />
              </div>
              {errors.nomeAzienda && touched.nomeAzienda && errors.nomeAzienda && (
                <div className="form-error" id="nomeAziendaError">
                  {errors.nomeAzienda}
                </div>
              )}
              <div className="mt-3">
                <label className="flex required" htmlFor="referenze">
                  Referenze
                </label>
                <input
                  className="input"
                  type="text"
                  name="referenze"
                  id="referenze"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.referenze}
                  aria-errormessage="referenzeError"
                  aria-required="true"
                />
              </div>
              {errors.referenze && touched.referenze && errors.referenze && (
                <div className="form-error" id="referenzeError">
                  {errors.referenze}
                </div>
              )}
              <div className="mt-3">
                <label className="flex required" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="input"
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  aria-errormessage="emailError"
                  aria-required="true"
                />
                {errors.email && touched.email && errors.email && (
                  <div className="form-error" id="emailError">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="mt-3">
                <label className="flex required" htmlFor="telefono">
                  Telefono
                </label>
                <input
                  className="input"
                  type="text"
                  name="telefono"
                  id="telefono"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.telefono}
                  aria-errormessage="telefonoError"
                  aria-required="true"
                />
                {errors.telefono && touched.telefono && errors.telefono && (
                  <div className="form-error" id="telefonoError">
                    {errors.telefono}
                  </div>
                )}
              </div>
              <div className="mt-3">
                <label className="flex required" htmlFor="url">
                  URL sito web
                </label>
                <input
                  className="input"
                  type="text"
                  name="url"
                  id="url"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.url}
                  aria-errormessage="urlError"
                  aria-required="true"
                />
                {errors.url && touched.url && errors.url && (
                  <div className="form-error" id="urlError">
                    {errors.url}
                  </div>
                )}
              </div>
              <div className="mt-3">
                <label className="flex required" htmlFor="logo">
                  Carica il tuo logo
                </label>
                <FileInput
                  files={files}
                  setFiles={setFiles}
                  maxFiles={1}
                  id="logo"
                  aria-required="true"
                />
                {errors.files && touched.files && errors.files && files.length < 1 && (
                  <div className="form-error">{errors.files}</div>
                )}
              </div>
              <div className="flex justify-end mt-10">
                <button className="primary w-full md:w-auto" type="submit">
                  Candidati
                </button>
              </div>
            </form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default CandidaturaSponsor;
