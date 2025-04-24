## The followings are some of the improvements we can bring to the project

## Frontend
- User input data validation (Forms)
- Usage of the hook `useMemo` to better optimize the performance (ex: in the function `computePriceByIngredient` in **RecipesTable**).
- We might want to add better API error handling and show more user friendly and error messages.

## API
- Validate data send by the frontend before interacting with the database
- A lot of functions in the `API` **Controllers** are repeating itself because they mostly do the same thing. We can create generic functions to adapt to most (if not all) of them.
- We should add meaningful error messages instead of only sending 500 status code from the server(API).
- We can add api documentations using tools like Swagger or OpenAPI.
- We could add pagination for better performance.
- We might want to put seperate route groups in their appropriate files instead of putting them in one file (ex: **Routes**/**index.ts**) for vetter folder structure.

## Database
- Before creating / updating / deleting we should check if they exists or not. Or at least handle the errors properly or might log those kind of errors.
- Database connection do not handle errors properly. We should add error handling for database connection.

## General
- Add some more comments to understand the code faster.
- Some names types are not consistent (ex: `useQueryIngredientList` and `useQueryListRecipe`)
- Using types (typescript) and type hint properly so we do not make the mistake of putting the wrong type of data.
- Many of the values are **hardcoded** (different ports) which might need to be modified depending on the necessity. Ofcourse we can have a central **config file** to manage these values but those values can also be stored in a **environment variable** and in our source code we can check if the value is set in the environment variable before using ones from **config files**.
- We can add tests for the frontend and backend.
- Add documentations for front-end and back-end including Database.
