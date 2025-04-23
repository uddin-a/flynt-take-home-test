import { TagType } from "../Forms/CreateIngredientForm";

export interface Ingredient {
  id: number;
  name: string;
  price: number;
  tag: TagType;
}
