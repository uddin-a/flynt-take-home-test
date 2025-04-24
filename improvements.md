## The followings are some of the improvements we can bring to the project

- On the front and back we should add more data validations such as for forms and other inputs.
- Add some more comments to understand the code faster.
- Some names types are not consistent (ex: `useQueryIngredientList` and `useQueryListRecipe`)
- A lot of functions in the `API` **Controllers** are repeating itself because they mostly do the same thing. We can create generic functions to adapt to most (if not all) of them.
- Using types and type hint properly so we do not make the mistake of putting the wrong type of data.
- Many of the values are **hardcoded** (different ports) which might need to be modified depending on the necessity. Ofcourse we can have a central **config file** to manage these values but those values can also be stored in a **environment variable** and in our source code we can check if the value is set in the environment variable before using ones from **config files**.
- We need should add more **data validation** on the `server` side.
- Before creating / updating / deleting we should check if they exists or not. Or at least handle the errors properly or might log those kind of errors.
