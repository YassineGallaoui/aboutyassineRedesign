
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
  media: string[];
  link?: string;
};

export const projectsDatasetArray: Project[] = [
  {
    id: 0,
    codeName: "Pong",
    name: "PO-NG",
    year: 2024,
    media: [
      "po-ng-1.webp",
      "po-ng-2.webp",
      "po-ng-3.webp",
      "po-ng-4.webp",
      "po-ng-5.webp"
    ],
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
      "public/imgs/autotorino-1.webp",
      "public/imgs/autotorino-2.webp",
      "public/imgs/autotorino-3.webp",
      "public/imgs/autotorino-4.webp",
      "public/imgs/autotorino-5.webp"],
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
      "public/imgs/maserati-1.webp",
      "public/imgs/maserati-2.webp",
      "public/imgs/maserati-3.webp",
      "public/imgs/maserati-4.webp",
      "public/imgs/maserati-5.webp",
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
      "public/imgs/bee-tickets-1.webp",
      "public/imgs/bee-tickets-2.webp",
      "public/imgs/bee-tickets-3.webp",
      "public/imgs/bee-tickets-4.webp",
      "public/imgs/bee-tickets-5.webp",
      "public/imgs/bee-tickets-6.webp"
    ],
    workingFor: "Once Upon A Time SA",
    description:
      "Worked with a team of 7+ people on creating a whole new tickets selling platform for internal use. Implemented all the frontend side of the website and also contributed, in some cases, in the design process.",
    frontend: "Javascript + SCSS",
    backend: "Django + MySQL",
  },
];

export const projectsDataset = [...projectsDatasetArray]