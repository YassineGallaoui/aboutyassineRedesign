import { StaticImageData } from "next/image";
import imgAutotorino1 from "../public/imgs/autotorino-1.webp";
import imgAutotorino2 from "../public/imgs/autotorino-2.webp";
import imgAutotorino3 from "../public/imgs/autotorino-3.webp";
import imgAutotorino4 from "../public/imgs/autotorino-4.webp";
import imgAutotorino5 from "../public/imgs/autotorino-5.webp";
import imgAutotorino6 from "../public/imgs/autotorino-6.webp";
import imgBeeTickets1 from "../public/imgs/bee-tickets-1.webp";
import imgBeeTickets2 from "../public/imgs/bee-tickets-2.webp";
import imgBeeTickets3 from "../public/imgs/bee-tickets-3.webp";
import imgBeeTickets4 from "../public/imgs/bee-tickets-4.webp";
import imgBeeTickets5 from "../public/imgs/bee-tickets-5.webp";
import imgBeeTickets6 from "../public/imgs/bee-tickets-6.webp";
import imgMaserati1 from "../public/imgs/maserati-1.webp";
import imgMaserati2 from "../public/imgs/maserati-2.webp";
import imgMaserati3 from "../public/imgs/maserati-3.webp";
import imgMaserati4 from "../public/imgs/maserati-4.webp";
import imgMaserati5 from "../public/imgs/maserati-5.webp";
import imgPong1 from "../public/imgs/po-ng-1.webp";
import imgPong2 from "../public/imgs/po-ng-2.webp";
import imgPong3 from "../public/imgs/po-ng-3.webp";
import imgPong4 from "../public/imgs/po-ng-4.webp";
import imgPong5 from "../public/imgs/po-ng-5.webp";

export type Project = {
  id?: number;
  codeName: string;
  name: string;
  workingFor: string;
  year: number;
  description: string;
  frontend: string;
  backend: string;
  recognitions?: string[];
  media: StaticImageData[];
  link?: string;
};

export const projectsDatasetArray: Project[] = [
  {
    id: 0,
    codeName: "Pong",
    name: "PO-NG",
    year: 2024,
    media: [imgPong1, imgPong2, imgPong3, imgPong4, imgPong5],
    workingFor: "Freelance",
    description: `Solo project made to deepen my knowledge on the canvas tag. Tribute to the famous ATARI Pong game from 1972.`,
    frontend: "HTML + SCSS + TypeScript",
    backend: "Node.js + Express.js + ws + MongoDB",
    link: "https://po-ng.netlify.app/",
  },
  {
    id: 1,
    codeName: "Autotorino",
    name: "Autotorino",
    year: 2023,
    media: [
      imgAutotorino1,
      imgAutotorino2,
      imgAutotorino3,
      imgAutotorino4,
      imgAutotorino5,
      imgAutotorino6,
    ],
    workingFor: "Deloitte",
    description:
      "Worked in a team of 15+ people on the redesign and implementation of a car auction platform, crafting both backoffice and frontoffice.",
    frontend: "Next.js + MUI",
    backend: "Nest.js + Socket.io + DocumentDB + Amazon Cognito",
  },
  {
    id: 2,
    codeName: "Maserati",
    name: "Maserati",
    year: 2022,
    media: [
      imgMaserati1,
      imgMaserati2,
      imgMaserati3,
      imgMaserati4,
      imgMaserati5,
    ],
    recognitions: ["Awwwards Honorable Mention"],
    workingFor: "Deloitte",
    description:
      "Joined the project during the UAT phase. Worked in a team of 30+ people. In the first period I worked mainly on bug fixing and analytics integration. After the go-live I joined a team of 5 people to develop from scratch the Owner Area section of the website, took care of all analytics and later I've also took care of bug fixing.",
    frontend: "AEM + Javascript + jQuery + gsap",
    backend: "AEM + Java",
  },
  {
    id: 3,
    codeName: "BeeTickets",
    name: "Bee Tickets",
    year: 2021,
    media: [
      imgBeeTickets1,
      imgBeeTickets2,
      imgBeeTickets3,
      imgBeeTickets4,
      imgBeeTickets5,
      imgBeeTickets6,
    ],
    workingFor: "Once Upon A Time SA",
    description:
      "Worked with a team of 7+ people on creating a whole new tickets selling platform for internal use. Implemented all the frontend side of the website and also contributed, in some cases, in the design process.",
    frontend: "Javascript + SCSS",
    backend: "Django + MySQL",
  },
];

export const projectsDataset = [...projectsDatasetArray]