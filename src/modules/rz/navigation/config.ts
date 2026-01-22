import type{ Category, Segment } from "@/client";
import { routes } from "@/common/model/routes";

export type NavLinks = {
	label: string;
	href: string;
};

type Panels = {
	name: Segment;
	hint: string;
	links: NavLinks[];
};

type Config = {
	introHint: string;
	panels: Record<Segment, Panels>;
};

const createCategoryList = <T extends readonly Category[]>(
    ...args: T & (
        Exclude<Category, T[number]> extends never 
        ? T 
        : ["ОШИБКА: Пропущены категории:", Exclude<Category, T[number]>]
    )
): T => args;
  
const buildNavLinks = (segment: Segment): NavLinks[] => {
    return createCategoryList('music', 'movies', 'books', "art").map((category) => ({
		label: category,
		href: routes.rz({ segment, category })
	}));
}

export const config = {
	introHint:
		'Нажав на один из разноцветных баннеров, смотрите, слушайте и читайте подобранные нами произведения искусства, под ваше состояние. Выберите один из них - узнайте больше.',
	panels: {
		instincts: {
			name: 'instincts',
			hint: 'На красном банере, мы подобрали работы авторов, делающих акцент на человеческих инстинктах, где ищется смысл через желание и самоуничтожение. Здесь вы найдете насилие, похоть, нигилизм, черный юмор и тому подобное.',
			links: buildNavLinks('instincts')
		},
		intellect: {
			name: 'intellect',
			hint: 'На синем баннере - наша коллекция образовательных, интеллектуальных и интеллигентных работ авторов, нашедших свой смысл и жизненный путь в возвышенном, научном и созидательном. Здесь, Вы найдете оперы, документалки, образовательные лекции, и тому подобное.',
			links: buildNavLinks('intellect')
		},
		balance: {
			name: 'balance',
			hint: 'На зелёном баннере, мы собрали сбалансированную коллекцию произведений, где авторы грамотно и умело совмещают в себе направление и идеи, выражая, таким образом, сложные или противоречивые мысли, доступно и ёмко. Здесь Вы найдёте внежанровую музыку и фильмы, экспериментальную живопись и тому подобное.',
			links: buildNavLinks('balance')
		}
	}
} as const satisfies Config;
