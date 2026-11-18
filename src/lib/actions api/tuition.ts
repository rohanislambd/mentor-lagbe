
 const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
import {  protectedMutation } from "../common/protecdapi";
import { CreateTuitionInput } from "../../../teype/tuitiontype";

export const createTuition = async (data: CreateTuitionInput) => {
  const baseUrl = BASE_URL
  const api = `${baseUrl}/tuitions`;
  const res = await protectedMutation(api, "POST", data);
  return res.json();
};
