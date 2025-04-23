## The following changes were made in this project


### WEB
- inside the file **IngredientsMutation.ts** inside function `useMutationIngredientCreate` the `onSuccess` was returning the wrong **Enum**. Instead of returning `Requests.listIngredient` it was returning `Requests.listRecipe` which was causing the list **update** issue.
- Added the `tag` input field in **ingridient form** and in **ingredient table**
- Added the `tag` type in the `Ingridient` **type** (`web-dev`/`src`/`Types`/`Ingridient.tsx`)
- I modified some data type from `any` to some specific data type for better type checking.
- in the **CreateRecipesForm.ts** i have added the limits (disabled) of ingridient depending on how much is selected (the max values has been set in that file). I have changed the list in a way that selected Ingredient are removed from the list to not create any duplicates.


### API

#### DB
- Changed the DB port from 5432 to 5433 (in .env.dist and ormconfig's test environment)
- Changed the name `db-data` to `db-dev-data` from the recipe **clean-db** in the **Makefile** because that's how the container service was named.
- Added the 'tag' column to add the `tag` of ingridient. it was added in `api-dev`/`src`/`Entries`/`Ingredient.ts`
