import { BASE_URL, protectedMutation } from "../common/protecdapi";
import { CreateTuitionInput } from "../../../teype/tuitiontype";

export const createTuition = async (data: CreateTuitionInput) => {
  const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";
  const api = `${baseUrl}/tuitions`;
  const res = await protectedMutation(api, "POST", data);
  return res.json();
};
