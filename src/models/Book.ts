export interface Book {
    id?: number;
    id_user?: number;
    author: string;
    title: string;
    date: number;
    city: string;
    description?: string;
    quantity: number;
    lbc: string;
    udc: string;
    ISBN: string;
    publication_type: string;
  }