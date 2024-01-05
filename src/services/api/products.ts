import { ProductType } from "@/app/models/product-type";
import api, { EndPoints } from "../base/axios";

export async function getProductAxios() {
  return await api.get<ProductType[]>(EndPoints.products);
}
export async function postProductAxios(product: ProductType) {
  return await api.post<ProductType>(EndPoints.products, product);
}
