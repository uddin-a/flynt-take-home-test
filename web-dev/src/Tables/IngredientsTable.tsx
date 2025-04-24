import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Modal } from "@mui/material";
import Button from "@mui/material/Button";
import { Ingredient } from "../Types/Ingredient";
import {
  useMutationIngredientDelete,
  useMutationUpdateIngredient,
} from "../Hooks/Mutation/IngredientsMutation";
import { useState } from "react";
import { TagType } from "../Forms/CreateIngredientForm";
import Backdrop from "@mui/material/Backdrop";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function IngredientTable({
  ingredients,
}: {
  ingredients: Ingredient[];
}): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Ingredient | null>(null);
  const { mutateAsync: deleteIngredient } = useMutationIngredientDelete();
  const tagList: TagType[] = ["protéine", "féculent", "légumes"];
  const { mutateAsync: updateTag } = useMutationUpdateIngredient();

  const handlerButtonDelete = async (ingredient: Ingredient) => {
    await deleteIngredient(ingredient.id);
  };

  const handleUpdate = async (
    ingredient: Ingredient | null,
    newTag: TagType,
  ) => {
    if (!ingredient) {
      return;
    }

    await updateTag({
      id: ingredient.id,
      name: ingredient.name,
      price: ingredient.price,
      tag: newTag,
    });

    setModalOpen(false);
  };

  return (
    <Box className="tableContainer">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>My ingredients</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Tag</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients.map((row) => {
              return (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.price} €</TableCell>
                  <TableCell
                    align="right"
                    style={{ textTransform: "capitalize" }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setSelectedRow(row);
                        setModalOpen(true);
                      }}
                    >
                      {row.tag}
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handlerButtonDelete(row)}>
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
      >
        <Box
          sx={{ ...style, width: 400 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            borderRadius: 8,
          }}
        >
          {tagList.map((val, key) => {
            return (
              <Button key={key} onClick={() => handleUpdate(selectedRow, val)}>
                {val}
              </Button>
            );
          })}
        </Box>
      </Modal>
    </Box>
  );
}
