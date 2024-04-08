export interface Key {
  id: number;
}

export interface CreateOrUpdateAuthor {
  name: string;
  email: string;
  dateOfBirth: Date;
}

export type Author = Key & CreateOrUpdateAuthor;
