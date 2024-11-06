import { Card } from './card.model';
import { Colors } from './color.model';
import { List } from './list.model';
import { User } from './users.model';

export interface Board {
  id: string;
  title: string;
  backgroundColor: Colors;
  creationAt: Date;
  updatedAt: Date;
  members: User[];
  lists: List[];
  cards: Card[];
}
