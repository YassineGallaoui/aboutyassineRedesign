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
                title: "NextJS bp",
                description: "features custom grid system and custom routing animations using NextJS, (s)css and Typescript",
                year: "2024",
                link: "https://vanilla-boilerplate.vercel.app/",
            },
            {
                title: "Vanilla bp",
                description: "features custom grid system and custom routing animations using the simplest stack: html, (s)css and js, built with vite",
                year: "2024",
                link: "https://vanilla-boilerplate.vercel.app/",
            }
        ]
    },
    {
        categoryName: "Extra",
        projects: [
            {
                title: "Audio Toggles",
                description: "features a growing collection of animated audio togglers",
                year: "2024",
                link: "https://audio-toggles.vercel.app/",
            },
        ]
    }, {
        categoryName: "Boilerplates",
        projects: [
            {
                title: "NextJS bp",
                description: "features custom grid system and custom routing animations using NextJS, (s)css and Typescript",
                year: "2024",
                link: "https://vanilla-boilerplate.vercel.app/",
            },
            {
                title: "Vanilla bp",
                description: "features custom grid system and custom routing animations using the simplest stack: html, (s)css and js, built with vite",
                year: "2024",
                link: "https://vanilla-boilerplate.vercel.app/",
            }
        ]
    }, {
        categoryName: "Boilerplates",
        projects: [
            {
                title: "NextJS bp",
                description: "features custom grid system and custom routing animations using NextJS, (s)css and Typescript",
                year: "2024",
                link: "https://vanilla-boilerplate.vercel.app/",
            },
            {
                title: "Vanilla bp",
                description: "features custom grid system and custom routing animations using the simplest stack: html, (s)css and js, built with vite",
                year: "2024",
                link: "https://vanilla-boilerplate.vercel.app/",
            }
        ]
    }, {
        categoryName: "Boilerplates",
        projects: [
            {
                title: "NextJS bp",
                description: "features custom grid system and custom routing animations using NextJS, (s)css and Typescript",
                year: "2024",
                link: "https://vanilla-boilerplate.vercel.app/",
            },
            {
                title: "Vanilla bp",
                description: "features custom grid system and custom routing animations using the simplest stack: html, (s)css and js, built with vite",
                year: "2024",
                link: "https://vanilla-boilerplate.vercel.app/",
            }
        ]
    }, {
        categoryName: "Boilerplates",
        projects: [
            {
                title: "NextJS bp",
                description: "features custom grid system and custom routing animations using NextJS, (s)css and Typescript",
                year: "2024",
                link: "https://vanilla-boilerplate.vercel.app/",
            },
            {
                title: "Vanilla bp",
                description: "features custom grid system and custom routing animations using the simplest stack: html, (s)css and js, built with vite",
                year: "2024",
                link: "https://vanilla-boilerplate.vercel.app/",
            }
        ]
    }, {
        categoryName: "Boilerplates",
        projects: [
            {
                title: "NextJS bp",
                description: "features custom grid system and custom routing animations using NextJS, (s)css and Typescript",
                year: "2024",
                link: "https://vanilla-boilerplate.vercel.app/",
            },
            {
                title: "Vanilla bp",
                description: "features custom grid system and custom routing animations using the simplest stack: html, (s)css and js, built with vite",
                year: "2024",
                link: "https://vanilla-boilerplate.vercel.app/",
            }
        ]
    },
];

export const labDataset = [...labDatasetArray]
