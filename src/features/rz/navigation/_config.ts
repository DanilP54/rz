import { NAV_SEGMENTS, NavSegments, ROUTES } from "@/shared/model/routes";
import { NavigationConfig, NavLinks } from "./types";

export const config = {
  intro: {
    text: "Нажав на один из разноцветных баннеров, смотрите, слушайте и читайте подобранные нами произведения искусства, под ваше состояние. Выберите один из них - узнайте больше.",
  },
  panels: {
    [NAV_SEGMENTS.INSTINCTS]: {
      segmentName: NAV_SEGMENTS.INSTINCTS,
      hintText:
        "На красном банере, мы подобрали работы авторов, делающих акцент на человеческих инстинктах, где ищется смысл через желание и самоуничтожение. Здесь вы найдете насилие, похоть, нигилизм, черный юмор и тому подобное.",
      links: buildPanelLinks(NAV_SEGMENTS.INSTINCTS),
    },
    [NAV_SEGMENTS.INTELLECT]: {
      segmentName: NAV_SEGMENTS.INTELLECT,
      hintText:
        "На синем баннере - наша коллекция образовательных, интеллектуальных и интеллигентных работ авторов, нашедших свой смысл и жизненный путь в возвышенном, научном и созидательном. Здесь, Вы найдете оперы, документалки, образовательные лекции, и тому подобное.",
      links: buildPanelLinks(NAV_SEGMENTS.INTELLECT),
    },
    [NAV_SEGMENTS.BALANCE]: {
      segmentName: NAV_SEGMENTS.BALANCE,
      hintText:
        "На зелёном баннере, мы собрали сбалансированную коллекцию произведений, где авторы грамотно и умело совмещают в себе направление и идеи, выражая, таким образом, сложные или противоречивые мысли, доступно и ёмко. Здесь Вы найдёте внежанровую музыку и фильмы, экспериментальную живопись и тому подобное.",
      links: buildPanelLinks(NAV_SEGMENTS.BALANCE),
    },
  },
} as const satisfies NavigationConfig;

function buildPanelLinks(segment: NavSegments): NavLinks {
  const categories = ROUTES.rz[segment];

  return Object.entries(categories).map(([category, path]) => ({
    href: path,
    label: category.toLowerCase(),
  }));
}