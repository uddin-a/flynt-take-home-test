import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Card,
  CardContent,
  createStyles,
  Popover,
  Typography,
} from "@mui/material";
import { Recipe } from "../Types/Recipe";
import { Ingredient } from "../Types/Ingredient";
import { useMutationRecipeDelete } from "../Hooks/Mutation/RecipeMutation";
import ErrorIcon from "@mui/icons-material/Error";
import { useState } from "react";
import {
  MAX_FECULANT,
  MAX_LEGUME,
  MAX_PROTEINE,
  MIN_FECULANT,
  MIN_LEGUME,
  MIN_PROTEINE,
} from "../Forms/CreateRecipesForm";

function countIngredientTags(ingredients: Ingredient[]): {
  proteine: number;
  legume: number;
  feculant: number;
} {
  let totalProt: number = 0;
  let totalFec: number = 0;
  let totalLeg: number = 0;

  // Calculate total number of different type of ingredient tags.
  ingredients.map((val) => {
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

  return {
    proteine: totalProt,
    feculant: totalFec,
    legume: totalFec,
  };
}

export function RecipesTable({ recipes }: { recipes: Recipe[] }): JSX.Element {
  const { mutateAsync: deleteRecipe } = useMutationRecipeDelete();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handlerButtonDelete = async (recipe: Recipe) => {
    await deleteRecipe(recipe.id);
  };

  const computePriceByIngredient = (ingredients: Ingredient[]) => {
    return ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.price;
    }, 0);
  };

  const hasIrrecularIngredient = (ingredients: Ingredient[]): boolean => {
    const ings = countIngredientTags(ingredients);

    if (ings.proteine < MIN_PROTEINE || ings.proteine > MAX_PROTEINE) {
      return true;
    } else if (ings.feculant < MIN_FECULANT || ings.feculant > MAX_FECULANT) {
      return true;
    } else if (ings.legume < MIN_LEGUME || ings.legume > MAX_LEGUME) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Box className="tableContainer">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>My recipes</TableCell>
              <TableCell align="right">Time to cook</TableCell>
              <TableCell align="right">Number of people</TableCell>
              <TableCell align="right">Ingredients</TableCell>
              <TableCell align="right">Total price</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipes.map((row, index) => (
              <TableRow
                key={`recipe_name${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "start",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {hasIrrecularIngredient(row.ingredients || []) ? (
                      <div
                        aria-owns={open ? "mouse-over-popover" : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                      >
                        <ErrorIcon color="warning" fontSize={"small"} />
                        <PopOverElement
                          open={open}
                          anchorEl={anchorEl}
                          handlePopoverClose={handlePopoverClose}
                          ingredients={row.ingredients}
                        />
                      </div>
                    ) : undefined}
                    {row.name}
                  </div>
                </TableCell>
                <TableCell align="right">{row.timeToCook}</TableCell>
                <TableCell align="right">{row.numberOfPeople}</TableCell>
                <TableCell align="right">
                  {row.ingredients.map((ingredient, index) => {
                    return <p key={`ing_name${index}`}>{ingredient.name}</p>;
                  })}
                </TableCell>
                <TableCell align="right">
                  {computePriceByIngredient(row.ingredients) *
                    row.numberOfPeople}
                  €
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => handlerButtonDelete(row)}>
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function PopOverElement({
  open,
  anchorEl,
  handlePopoverClose,
  ingredients,
}: {
  open: boolean;
  anchorEl: HTMLElement | null;
  handlePopoverClose: () => void;
  ingredients: Ingredient[];
}) {
  const ings = countIngredientTags(ingredients);
  const tstyle = createStyles({});

  return (
    <Popover
      id="mouse-over-popover"
      sx={{ pointerEvents: "none" }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      <div>
        <Card>
          <CardContent>
            <Typography
              variant="h1"
              component="h1"
              style={{ fontSize: 18, fontWeight: "bold" }}
            >
              Irregular ingredients
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              The ingredient tags might have changed.
            </Typography>
            <Typography
              mt={4}
              style={{ fontSize: 14, fontWeight: 500 }}
            >{`Protéine : ${ings.proteine} (Min: ${MIN_PROTEINE} - Max: ${MAX_PROTEINE})`}</Typography>
            <Typography>{`Féculent :  ${ings.feculant} (Min: ${MIN_FECULANT} - Max: ${MAX_FECULANT})`}</Typography>
            <Typography>{`Légumes :  ${ings.legume} (Min: ${MIN_LEGUME} - Max: ${MAX_LEGUME})`}</Typography>
          </CardContent>
        </Card>
      </div>
    </Popover>
  );
}
