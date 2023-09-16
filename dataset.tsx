import imgMaserati1 from "./public/imgs/maserati-1.webp";
import imgMaserati2 from "./public/imgs/maserati-2.webp";
import imgMaserati3 from "./public/imgs/maserati-3.webp";
import imgMaserati4 from "./public/imgs/maserati-4.webp";
import imgMaserati5 from "./public/imgs/maserati-5.webp";
import imgBeeTickets1 from "./public/imgs/bee-tickets-1.webp";
import imgBeeTickets2 from "./public/imgs/bee-tickets-2.webp";
import imgBeeTickets3 from "./public/imgs/bee-tickets-3.webp";
import imgBeeTickets4 from "./public/imgs/bee-tickets-4.webp";
import { StaticImageData } from "next/image";

export type Project = {
  id: number;
  name: string;
  workingFor: string;
  year: number;
  description: string;
  frontend: string;
  backend: string;
  awards?: string[];
  media: StaticImageData[];
};

export const projectsDataset: Project[] = [
  {
    id: 0,
    name: "Autotorino",
    year: 2023,
    media: [
      imgBeeTickets2,
      imgMaserati2,
      imgBeeTickets1,
      imgBeeTickets2,
      imgBeeTickets3,
    ],
    workingFor: "Deloitte",
    description:
      "Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, crafting both backoffice and frontoffice.",
    frontend: "Next.js + MUI",
    backend: "Nest.js + Socket.io + DocumentDB + Amazon Cognito",
  },
  {
    id: 1,
    name: "Maserati",
    year: 2022,
    media: [
      imgMaserati1,
      imgMaserati2,
      imgMaserati3,
      imgMaserati4,
      imgMaserati5,
    ],
    awards: ["Awwwards Honorable Mention"],
    workingFor: "Deloitte",
    description:
      "Joined the project during its UAT phase with a team of 30 people. In the first period I worked mainly on bugfixing and analytics integration. After the go live I joined a team of 5 people to develop from scratch the Owner Area section of the website, take care of all analytics and later also bugfixing.",
    frontend: "AEM + Vanilla Javascript + jQuery + gsap",
    backend: "AEM + Java",
  },
  {
    id: 2,
    name: "Bee Tickets",
    year: 2021,
    media: [imgBeeTickets1, imgBeeTickets2, imgBeeTickets3, imgBeeTickets4],
    workingFor: "Once Upon A Time SA",
    description:
      "Worked with a team of 5 people on creating a whole new tickets selling platform for internal use. Implemented all the frontend side of the website and also contributed, in some cases, in the design process.",
    frontend: "Vanilla Javascript + SCSS",
    backend: "Django + MySQL",
  },
];
