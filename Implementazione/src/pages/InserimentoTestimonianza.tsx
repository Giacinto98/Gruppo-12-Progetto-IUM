import { useState } from "react";
import { Formik } from "formik";
import FileInput from "../components/FileInput";
import { useMutation, useQuery } from "react-query";
import {
  defaultTestimonianzaImages,
  EventTestimonianza,
  postTestimonianza,
} from "../services/eventTestimonianzaService";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useCurrentUser } from "../context/userContext";
import { getEventoInfo } from "../services/eventService";
import { ExtendedLocation } from "../location";

interface FormValues {
  testimonianza: string;
  files: { preview: string }[];
}

const InserimentoTestimonianza = () => {
  const location = useLocation() as ExtendedLocation;
  const navigate = useNavigate();
  const { idEvento } = useParams();
  const { currentUser } = useCurrentUser();
  const [files, setFiles] = useState<{ preview: string }[]>([]);
  const initialFormValues: FormValues = {
    testimonianza: "",
    files,
  };

  const eventInfoQuery = useQuery(
    "eventInfoQ",
    async () => {
      return await getEventoInfo(idEvento!);
    },
    { enabled: idEvento !== undefined }
  );

  const addTestimonianza = useMutation(
    async (data: EventTestimonianza) => {
      return postTestimonianza(data);
    },
    {
      onSuccess: () => {
        navigate("/testimonianze");
      },
    }
  );

  if (!currentUser) {
    return (
      <Navigate
        to={location.state?.previousPathname ? location.state.previousPathname : "/login"}
        state={{ previousPathname: location.pathname }}
      />
    );
  }

  if (eventInfoQuery.isLoading || !eventInfoQuery.data) {
    return <div className="h-full"></div>;
  }

  return (
    <div className="form-background min-h-full py-10 bg-primary-tint">
      <div className="card flex flex-col items-center p-6 md:p-[60px] max-w-[95%] md:max-w-2xl md:w-2xl mx-auto rounded-lg">
        <div className="flex items-start flex-col self-start">
          <h2 className="mb-20">Inserisci una testimonianza</h2>
          <h4>{eventInfoQuery.data.name}</h4>
          <div className="flex space-x-5 items-center mt-10">
            <img className="w-[100px] h-[100px]" src={currentUser.img} alt="" />
            <span className="text-sm">{`${currentUser.nome} ${currentUser.cognome}`}</span>
          </div>
        </div>

        <Formik
          initialValues={initialFormValues}
          validate={(values: FormValues) => {
            const errors: Partial<FormValues> = {};
            if (!values.testimonianza) {
              errors.testimonianza = "Inserisci la testimonianza";
            }
            return errors;
          }}
          onSubmit={(values, { validateForm }) => {
            validateForm();
            const testimonianzaData: EventTestimonianza = {
              id: idEvento!,
              nomeEvento: eventInfoQuery.data.name,
              comment: values.testimonianza,
              dataTestimonianza: new Date().toLocaleString(),
              dataEvento: eventInfoQuery.data.data,
              indirizzo: eventInfoQuery.data.indirizzo,
              imgs: defaultTestimonianzaImages,
              nomeUtente: `${currentUser.nome} ${currentUser.cognome}`,
              profileImg: currentUser.img,
            };
            addTestimonianza.mutate(testimonianzaData);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mt-3">
                <label className="flex required" htmlFor="testimonianza">
                  Testimonianza
                </label>
                <textarea
                  className="input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.testimonianza}
                  name="testimonianza"
                  id="testimonianza"
                  aria-errormessage="testimonianzaError"
                  aria-required="true"
                />
              </div>
              {errors.testimonianza && touched.testimonianza && errors.testimonianza && (
                <div className="form-error" id="testimonianzaError">
                  {errors.testimonianza}
                </div>
              )}
              <div className="my-3">
                <label className="block" htmlFor="foto">
                  Carica foto
                </label>
                <FileInput files={files} setFiles={setFiles} maxFiles={10} id="foto" />
              </div>
              <div className="flex justify-end mt-10">
                <button className="primary w-full md:w-auto" type="submit">
                  Pubblica testimonianza
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default InserimentoTestimonianza;
