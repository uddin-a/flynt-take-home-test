import { Code, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type TagType = "légumes" | "protéine" | "féculent";

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  tag: TagType;
}
