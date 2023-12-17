import { Router, Response, Request } from 'express';
import { Book } from '../models/Book'; // Импортируем модель книги
import db from './db';
import * as jwt from 'jsonwebtoken';
import config from 'config';

const router = Router();


router.post('/addBook', (req: Request, res: Response) => {
  const {id_user, author, title, date, city, description, quantity, lbc, udc, ISBN, publication_type }: Book = req.body;

  const bookData: Book = {
    id_user,
    author,
    title,
    date,
    city,
    description,
    quantity,
    lbc,
    udc,
    ISBN,
    publication_type,
  };
  console.log('test');
  db.query('INSERT INTO book SET ?', [bookData], (err, results) => {
    if (err) {
      console.error('Ошибка добавления книги:', err);
      res.status(500).json({ message: 'Ошибка добавления книги' });
    } else {
      const insertedBookId = results.insertId;
      res.json({ message: 'Книга успешно добавлена', bookId: insertedBookId });
    }
  });
});

export default router;
