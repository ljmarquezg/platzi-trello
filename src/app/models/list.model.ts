import { Card } from "./card.model";

export interface List {
  id: string;
  title: string;
  position: number;
  creationAt: Date;
  updatedAt: Date;
  cards: Card[];
  description?: string;
}
