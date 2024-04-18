export interface Key {
  id: number;
}

export interface CreateOrUpdateBook {
  name: string;
  isbn: string;
  authorId: number;
  authorName: string;
}
export interface PaginatedBook {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  items: Array<Book>;
  pageNumber: number;
  totalPages: number;
}
export type Book = Key & CreateOrUpdateBook;
