import testA from "../assets/gennaro-swim.jpg";
import gennaro from "../assets/gennaro.jpg";

export interface HeroCarouselItemData {
  leftImg: string;
  altLeftImg: string;
  profileImg: string;
  name: string;
  title: string;
  content: string;
}

export const heroCarouselItemData: HeroCarouselItemData[] = [
  {
    leftImg: testA,
    altLeftImg: "Gennaro sott'acqua con la tuta da sub raccoglie una busta di plastica",
    profileImg: gennaro,
    name: "Gennaro",
    title: "Un'esperienza fantastica!",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    leftImg: testA,
    altLeftImg: "Gennaro sott'acqua con la tuta da sub raccoglie una busta di plastica",
    profileImg: gennaro,
    name: "Gennaro",
    title: "Un'esperienza fantastica!",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];
