import { Location } from "react-router-dom";

export type ExtendedLocation = Location & {
  state?: {
    previousPathname: string | undefined | null;
  };
};
