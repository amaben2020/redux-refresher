import api, { EndPoints } from "../base/axios";

export const getSales = async () => {
  return await api.get(EndPoints.sales);
};
