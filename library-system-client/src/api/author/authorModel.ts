export interface Key {
  id: number;
}

export interface CreateOrUpdateAuthor {
  name: string;
  email: string;
  dateOfBirth: string;
}

export type Author = Key & CreateOrUpdateAuthor;
