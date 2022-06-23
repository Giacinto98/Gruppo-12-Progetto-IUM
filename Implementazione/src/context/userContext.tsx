import React from "react";
import AuthenticationService, { CurrentUser } from "../services/authService";

interface AppContextInterface {
  currentUser: CurrentUser | null;
  fetchCurrentUser: () => void;
}

export const CurrentUserContext = React.createContext<AppContextInterface>(
  {} as AppContextInterface
);

export const CurrentUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = React.useState<null | CurrentUser>(
    AuthenticationService.getCurrentUser()
  );

  const fetchCurrentUser = () => {
    const user = AuthenticationService.getCurrentUser();
    setCurrentUser(user);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, fetchCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => React.useContext(CurrentUserContext);
