export type Project = {
    id?: number;
    title: string;
    description: string;
    year: string,
    link?: string;
};

export type Categories = {
    categoryName: string;
    projects: Project[];
};


export const labDatasetArray: Categories[] = [
    {
        categoryName: "Boilerplates",
        projects: [
            {
                title: "Vanilla bp V01",
                description: "features custom grid system and custom routing animations using the simplest stack: html, (s)css and js, built with vite",
                year: "2024",
                link: "https://vanilla-boilerplate.vercel.app/",
            },
            {
                title: "NextJS bp V01",
                description: "features  custom grid system and custom routing animations using NextJS, (s)css and Typescript",
                year: "2025",
                link: "https://nextjs-basic-boilerplate.vercel.app/",
            }
        ]
    },
    {
        categoryName: "WebGL & GLSL",
        projects: [
            {
                title: "Season 01",
                description: "some webgl and glsl experiments",
                year: "2024",
                link: "https://webgl-glsl-season01.vercel.app/",
            },
        ]
    },
    {
        categoryName: "ThreeJS & R3F",
        projects: [
            {
                title: "Image FX V01",
                description: "Simple image effect onMouseMove",
                year: "2024",
                link: "https://three-image-01.vercel.app/",
            }, {
                title: "3D Globe V01",
                description: "basic globe with connection curves between cities (lat,lon)",
                year: "2024",
                link: "https://globe-threejs-pi.vercel.app/",
            }
        ]
    },
    {
        categoryName: "Audio & Video",
        projects: [
            {
                title: "Audio Toggles",
                description: "features a growing collection of animated audio togglers",
                year: "2025",
                link: "https://audio-toggles.vercel.app/",
            },
        ]
    }
];

export const labDataset = [...labDatasetArray]
