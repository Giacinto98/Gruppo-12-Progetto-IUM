import { Formik } from "formik";
import { useCurrentUser } from "../context/userContext";
import AuthService from "../services/authService";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ExtendedLocation } from "../location";

interface FormValues {
  email: string;
  password: string;
  nome: string;
  cognome: string;
}

const Registrazione = () => {
  const { currentUser } = useCurrentUser();
  const location = useLocation() as ExtendedLocation;
  const navigate = useNavigate();
  const { fetchCurrentUser } = useCurrentUser();
  const initialFormValues: FormValues = {
    email: "",
    password: "",
    nome: "",
    cognome: "",
  };

  if (currentUser) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="form-background min-h-full py-10 bg-primary-tint">
      <main className="card flex flex-col items-center p-6 md:p-[60px] max-w-[95%] md:max-w-2xl md:w-2xl mx-auto rounded-lg">
        <h2 className="self-start mb-8">Effettua la registrazione</h2>
        <Formik
          initialValues={initialFormValues}
          validate={(values: FormValues) => {
            const errors: Partial<FormValues> = {};
            if (!values.nome) {
              errors.nome = "Inserisci il tuo nome";
            }
            if (!values.cognome) {
              errors.cognome = "Inserisci il tuo cognome";
            }
            if (!values.email) {
              errors.email = "Inserisci l'email";
            }
            if (!values.password) {
              errors.password = "Inserisci la password";
            }
            return errors;
          }}
          onSubmit={() => {
            AuthService.register();
            fetchCurrentUser();
            navigate(location.state?.previousPathname ? location.state.previousPathname : "/");
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mt-3">
                <label className="flex required" htmlFor="nome">
                  Nome
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
              </div>
              {errors.nome && touched.nome && errors.nome && (
                <div className="form-error" id="nomeError">
                  {errors.nome}
                </div>
              )}
              <div className="mt-3">
                <label className="flex required" htmlFor="cognome">
                  Cognome
                </label>
                <input
                  className="input"
                  type="text"
                  name="cognome"
                  id="cognome"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cognome}
                  aria-errormessage="cognomeError"
                  aria-required="true"
                />
              </div>
              {errors.cognome && touched.cognome && errors.cognome && (
                <div className="form-error" id="cognomeError">
                  {errors.cognome}
                </div>
              )}
              <div className="mt-3">
                <label className="flex required" htmlFor="email">
                  Email
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
              </div>
              {errors.email && touched.email && errors.email && (
                <div className="form-error" id="emailError">
                  {errors.email}
                </div>
              )}
              <div className="mt-3">
                <label className="flex required" htmlFor="password">
                  Password
                </label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  aria-errormessage="passwordError"
                  aria-required="true"
                />
              </div>
              {errors.password && touched.password && errors.password && (
                <div className="form-error" id="passwordError">
                  {errors.password}
                </div>
              )}
              <div className="flex justify-end mt-10">
                <button className="primary w-full md:w-auto" type="submit" disabled={isSubmitting}>
                  Registrati
                </button>
              </div>
            </form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default Registrazione;
