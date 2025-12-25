import { type Category, type GetCatalogQueryParams } from "@/common/api/gen";
import { catalogClient } from "@/common/api/gen/clients/CatalogClient/index";
import type { RequestConfig } from "@kubb/plugin-client/clients/fetch";

export async function getCatalog(
  category: Category,
  query?: GetCatalogQueryParams,
  config?: Partial<RequestConfig>
) {
  try {
    const api = catalogClient();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return await api.getCatalog(category, query, config);
  } catch (error) {
    throw new Error("error fetch");
  }
}
