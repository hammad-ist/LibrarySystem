export interface Key {
  id: number;
}

export interface CreateOrUpdateBook {
  name: string;
  isbn: string;
  authorId: number;
  authorName: string;
}

export type Book = Key & CreateOrUpdateBook;
