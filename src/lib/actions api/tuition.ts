import { BASE_URL, protectedMutation } from "../common/protecdapi";
import { CreateTuitionInput, UpdateTuitionInput } from "../../../teype/tuitiontype";

export const createTuition = async (data: CreateTuitionInput) => {
  const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";
  const api = `${baseUrl}/tuitions`;
  const res = await protectedMutation(api, "POST", data);
  return res.json();
};

export const updateTuitionDetails = async (
  id: string,
  data: UpdateTuitionInput
) => {
  const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";
  const api = `${baseUrl}/tuitions/${id}`;
  const res = await protectedMutation(api, "PATCH", data);
  return res.json();
};

export const deleteTuition = async (id: string) => {
  const baseUrl = BASE_URL ? BASE_URL.replace(/\/+$/, "") : "";
  const api = `${baseUrl}/tuitions/${id}`;
  const res = await protectedMutation(api, "DELETE");
  return res.json();
};
