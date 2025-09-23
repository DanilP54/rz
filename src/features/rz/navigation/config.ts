import { ROUTES, RZ_SEGMENTS } from "@/shared/model/routes";
import { NavigationConfig, NavLinks } from "./types";

export const config = {
  intro: {
    text: "Нажав на один из разноцветных баннеров, смотрите, слушайте и читайте подобранные нами произведения искусства, под ваше состояние. Выберите один из них - узнайте больше.",
  },
  panels: {
    [RZ_SEGMENTS.INSTINCTS]: {
      segmentName: RZ_SEGMENTS.INSTINCTS,
      hintText:
        "На красном банере, мы подобрали работы авторов, делающих акцент на человеческих инстинктах, где ищется смысл через желание и самоуничтожение. Здесь вы найдете насилие, похоть, нигилизм, черный юмор и тому подобное.",
      links: buildPanelLinks(RZ_SEGMENTS.INSTINCTS),
    },
    [RZ_SEGMENTS.INTELLECT]: {
      segmentName: RZ_SEGMENTS.INTELLECT,
      hintText:
        "На синем баннере - наша коллекция образовательных, интеллектуальных и интеллигентных работ авторов, нашедших свой смысл и жизненный путь в возвышенном, научном и созидательном. Здесь, Вы найдете оперы, документалки, образовательные лекции, и тому подобное.",
      links: buildPanelLinks(RZ_SEGMENTS.INTELLECT),
    },
    [RZ_SEGMENTS.BALANCE]: {
      segmentName: RZ_SEGMENTS.BALANCE,
      hintText:
        "На зелёном баннере, мы собрали сбалансированную коллекцию произведений, где авторы грамотно и умело совмещают в себе направление и идеи, выражая, таким образом, сложные или противоречивые мысли, доступно и ёмко. Здесь Вы найдёте внежанровую музыку и фильмы, экспериментальную живопись и тому подобное.",
      links: buildPanelLinks(RZ_SEGMENTS.BALANCE),
    },
  },
} as const satisfies NavigationConfig;

function buildPanelLinks(segment: RZ_SEGMENTS): NavLinks {
  const paths = ROUTES.rz[segment];

  return Object.entries(paths).map(([categoryName, path]) => ({
    href: path,
    label: categoryName.toLowerCase(),
  }));
}