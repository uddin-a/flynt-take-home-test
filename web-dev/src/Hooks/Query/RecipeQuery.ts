import { useQuery, UseQueryResult } from "react-query";
import axios from "../../Utils/axios";
import { Requests } from "../QueriesAndMutationList";
import { Recipe } from "../../Types/Recipe";

export const useQueryListRecipe = (): UseQueryResult<
  Array<Recipe>,
  unknown
> => {
  return useQuery([Requests.listRecipe], async () => {
    const { data } = await axios.get<{ data: Array<Recipe> }>("/recipe/list");
    return data;
  });
};
