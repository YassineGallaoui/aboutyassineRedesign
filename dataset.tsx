import imgMaserati1 from "./public/imgs/maserati-1.png";
import imgMaserati2 from "./public/imgs/maserati-2.png";
import autotorino1 from "./public/imgs/autotorino-1.png";
import autotorino2 from "./public/imgs/autotorino-2.png";
import imgBeeTickets1 from "./public/imgs/bee-tickets-1.png";
import imgBeeTickets2 from "./public/imgs/bee-tickets-2.png";
import smartFit1 from "./public/imgs/smartfit-1.png";
import smartfit2 from "./public/imgs/smartfit-2.png";
import { StaticImageData } from "next/image";

export type Project = {
  id: number;
  name: string;
  workingFor: string;
  year: number;
  description: string;
  frontend: string;
  backend: string;
  media: StaticImageData[];
};

export const projectsDataset: Project[] = [
  {
    id: 0,
    name: "Autotorino",
    year: 2023,
    media: [autotorino1, autotorino2, imgMaserati1, imgMaserati2, imgMaserati1],
    workingFor: "Deloitte",
    description:
      "Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. Worked with a team of 10/15 people on the redesign and implementation of a car auction platform, backoffice and frontoffice. ",
    frontend: "Next.js, MUI",
    backend: "Nest.js, Socket.io, MongoDB",
  },
  {
    id: 1,
    name: "Maserati",
    year: 2022,
    media: [
      imgMaserati1,
      imgMaserati2,
      imgMaserati1,
      imgMaserati2,
      imgMaserati1,
    ],
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
    media: [
      imgBeeTickets1,
      imgBeeTickets2,
      autotorino2,
      imgMaserati1,
      autotorino2,
    ],
    workingFor: "Once Upon A Time SA",
    description:
      "Worked with a team of 5 people on creating a whole new tickets selling platform for internal use. Implemented all the frontend side of the website -including analytics- and also contributed, in some cases, in the design process.",
    frontend: "Vanilla Javascript, Scss",
    backend: "Django, MySQL",
  },
  {
    id: 3,
    name: "SmartFit",
    year: 2020,
    media: [smartFit1, smartfit2, imgBeeTickets2, autotorino2, imgMaserati1],
    workingFor: "University of Milan Internship",
    description:
      "As part of my bachelor degree internship, I redesigned and developed a fitness tracking web application which helps trainers and individual athletes to keep track of various fitness, physical and body parameters.",
    frontend: "React, ChartJS2",
    backend: "Node.js, MongoDB",
  },
];
