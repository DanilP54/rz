import { Category, Segment } from "@/common/api/client";

export type NavLinks = {
    label: string;
    href: string;
};

export type Panel = {
    name: Segment;
    description: string;
    categories: Category[];
};

export type Config = {
    summaryDescription: string;
    panels: Record<Segment, Panel>;
};

export const configuration: Config = {
    summaryDescription:
        'Нажав на один из разноцветных баннеров, смотрите, слушайте и читайте подобранные нами произведения искусства, под ваше состояние. Выберите один из них - узнайте больше.',
    panels: {
        instincts: {
            name: 'instincts',
            description: 'На красном банере, мы подобрали работы авторов, делающих акцент на человеческих инстинктах, где ищется смысл через желание и самоуничтожение. Здесь вы найдете насилие, похоть, нигилизм, черный юмор и тому подобное.',
            categories: ['music', 'movies', 'books', 'art'],
        },
        intellect: {
            name: 'intellect',
            description: 'На синем баннере - наша коллекция образовательных, интеллектуальных и интеллигентных работ авторов, нашедших свой смысл и жизненный путь в возвышенном, научном и созидательном. Здесь, Вы найдете оперы, документалки, образовательные лекции, и тому подобное.',
            categories: ['music', 'movies', 'books', 'art'],
        },
        balance: {
            name: 'balance',
            description: 'На зелёном баннере, мы собрали сбалансированную коллекцию произведений, где авторы грамотно и умело совмещают в себе направление и идеи, выражая, таким образом, сложные или противоречивые мысли, доступно и ёмко. Здесь Вы найдёте внежанровую музыку и фильмы, экспериментальную живопись и тому подобное.',
            categories: ['music', 'movies', 'books', 'art'],
        }
    }
}

export const getPanels = () => {
    return Object.values(configuration.panels);
}

export const getPanelBySegment = (segment: Segment) => {
    return configuration.panels[segment];
}