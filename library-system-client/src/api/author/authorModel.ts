export interface Key {
  id: number;
}

export interface CreateOrUpdateAuthor {
  name: string;
  email: string;
  dateOfBirth: string;
}
export interface PaginatedAuthor {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  items: Array<Author>;
  pageNumber: number;
  totalPages: number;
}

export type Author = Key & CreateOrUpdateAuthor;
