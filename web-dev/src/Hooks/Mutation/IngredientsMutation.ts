import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import axios from "../../Utils/axios";
import { Requests } from "../QueriesAndMutationList";
import { TagType } from "../../Forms/CreateIngredientForm";

interface IngredientCreateType {
  name: string;
  price: number;
  tag: TagType;
}

export const useMutationIngredientCreate = (): UseMutationResult<
  any,
  unknown,
  IngredientCreateType
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.createIngredient],
    async ({ name, price, tag }: IngredientCreateType) => {
      return await axios.post(`/ingredient/create`, { name, price, tag });
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listIngredient);
      },
    },
  );
};

export const useMutationUpdateIngredient = (): UseMutationResult<
  any,
  unknown,
  IngredientCreateType & { id: number }
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.updateIngredient],
    async ({ id, name, price, tag }: IngredientCreateType & { id: number }) => {
      console.log("Updating ingredient:", { id, name, price, tag });
      return await axios.put(`/ingredient/update/`, { id, name, price, tag });
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listIngredient);
      },
    },
  );
};

export const useMutationIngredientDelete = (): UseMutationResult<
  any,
  unknown,
  number
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.deleteIngredient],
    async (id: number) => {
      return await axios.delete(`/ingredient/delete/${id}`);
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listIngredient);
      },
    },
  );
};
