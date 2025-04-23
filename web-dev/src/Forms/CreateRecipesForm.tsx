import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { CardCustom } from "../Components/CardCustom";
import { Loader } from "../Components/Loader";
import { useMutationRecipeCreate } from "../Hooks/Mutation/RecipeMutation";
import { useQueryIngredientList } from "../Hooks/Query/IngredientQuery";
import { ErrorPage } from "../Pages/ErrorPage";
import { Ingredient } from "../Types/Ingredient";
import { OptionsMultiSelectType } from "../Types/OptionsMultiSelect";

const MAX_PROTEINE: number = 1;
const MIN_PROTEINE: number = 0;
const MAX_FECULANT: number = 1;
const MIN_FECULANT: number = 1;
const MAX_LEGUME: number = Number.POSITIVE_INFINITY;
const MIN_LEGUME: number = 0;

export function CreateRecipesForm(): JSX.Element {
  const [name, setName] = useState("");
  const [timeToCook, setTimeToCook] = useState<number>(0);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(0);
  const [selectedIngredients, setSelectedIngredients] = useState<
    OptionsMultiSelectType[]
  >([]);
  const { mutateAsync: createRecipe } = useMutationRecipeCreate();
  const { data: ingredients, status, isLoading } = useQueryIngredientList();

  const resetFields = () => {
    setName("");
    setTimeToCook(0);
    setNumberOfPeople(0);
    setSelectedIngredients([]);
  };

  const handlerSubmitNewRecipe = async () => {
    if (!name || !timeToCook || !numberOfPeople || !selectedIngredients) {
      alert("Please fill all the fields");
      return;
    }

    let totalProt: number = 0;
    let totalFec: number = 0;
    let totalLeg: number = 0;

    selectedIngredients.map((val) => {
      switch (val.tag) {
        case "protéine":
          totalProt++;
          break;
        case "féculent":
          totalFec++;
          break;
        case "légumes":
          totalLeg++;
          break;
        default:
          break;
      }
    });

    if (totalProt < MIN_PROTEINE || totalProt > MAX_PROTEINE) {
      alert(
        `Incorrect number of protein selected. Min : ${MIN_PROTEINE} Max : ${MAX_PROTEINE}`,
      );
      return;
    } else if (totalFec < MIN_FECULANT || totalFec > MAX_FECULANT) {
      alert(
        `Incorrect number of féculent selected. Min : ${MIN_FECULANT} Max : ${MAX_FECULANT}`,
      );
      return;
    } else if (totalLeg < MIN_LEGUME || totalLeg > MAX_LEGUME) {
      alert(
        `Incorrect number of légumes selected. Min : ${MIN_LEGUME} Max : ${MAX_LEGUME}`,
      );
      return;
    }

    await createRecipe({
      name,
      timeToCook,
      numberOfPeople,
      ingredients: selectedIngredients.map((e) => e.id),
    });

    resetFields();
  };

  /*
    The following function serves to disable specific elements from the autocomplete field
  */
  const autocompleteDisabledHandler = (
    option: OptionsMultiSelectType,
  ): boolean => {
    // Check if the ingrédient already exists in the list.
    for (let i of selectedIngredients) {
      if (i.id === option.id) {
        return true;
      }
    }

    let totalProt: number = 0;
    let totalFec: number = 0;
    let totalLeg: number = 0;

    selectedIngredients.map((val) => {
      switch (val.tag) {
        case "protéine":
          totalProt++;
          break;
        case "féculent":
          totalFec++;
          break;
        case "légumes":
          totalLeg++;
          break;
        default:
          break;
      }
    });

    /*
      After calculating the total tag types of selected ingrédients return true or false according to
      the set max values.
    */

    switch (option.tag) {
      case "protéine":
        return totalProt >= MAX_PROTEINE;
      case "féculent":
        return totalFec >= MAX_FECULANT;
      case "légumes":
        return totalLeg >= MAX_LEGUME;
      default:
        return false;
    }
  };

  if (status === "error") {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div id="create-recipes-form">
      <Box
        display="flex"
        justifyContent="space-between"
        className="MarginTop16Px"
      >
        <CardCustom isSmall>
          <h2>New recipe</h2>
          <FormControl fullWidth margin="normal">
            <TextField
              id="name-recipe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name of the recipe"
              variant="outlined"
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            {/* on peut mettre plusieurs fois le même ingrédient dans le formulaire mais après ça l'enregistre qu'une fois*/}
            <Autocomplete
              onChange={(_e, value: OptionsMultiSelectType[]) => {
                setSelectedIngredients(value);
              }}
              value={selectedIngredients}
              multiple
              id="combo-box-demo"
              /* We are filtering the ingredient list to not include already selected items */
              options={
                !ingredients
                  ? []
                  : ingredients
                      .filter((ingredient) => {
                        for (let i of selectedIngredients) {
                          if (i.id === ingredient.id) {
                            return false;
                          }
                        }

                        return true;
                      })
                      .map((e: Ingredient) => {
                        return { label: e.name, id: e.id, tag: e.tag };
                      })
              }
              renderInput={(params: any) => (
                <TextField {...params} label="Ingredients" />
              )}
              getOptionDisabled={autocompleteDisabledHandler}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              value={timeToCook}
              onChange={(e) =>
                e.target.value
                  ? setTimeToCook(Number(e.target.value))
                  : setTimeToCook(0)
              }
              id="name-recipe"
              label="Time to cook"
              variant="outlined"
              type="number"
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              value={numberOfPeople}
              onChange={(e) =>
                e.target.value
                  ? setNumberOfPeople(Number(e.target.value))
                  : setNumberOfPeople(0)
              }
              id="name-recipe"
              label="Number of people"
              variant="outlined"
              type="number"
              fullWidth
            />
          </FormControl>
          <FormControl margin="normal">
            <Button onClick={handlerSubmitNewRecipe} variant="contained">
              Submit
            </Button>
          </FormControl>
        </CardCustom>
      </Box>
    </div>
  );
}
