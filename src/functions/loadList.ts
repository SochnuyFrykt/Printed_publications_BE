import { Router, Response, Request } from 'express';
import db from '../functions/db';
import { Book } from '../models/Book'
import * as jwt from 'jsonwebtoken';
import config from 'config';

const router = Router();

router.post('/loadList', async (req: Request, res: Response) => {
  const { userId } = req.body;
try {
    db.query('SELECT * FROM book WHERE id_user = ?', [userId], (error, userBooksResult) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Преобразование результатов запроса в массив моделей книг
        // const books: Book[] = userBooksResult.map((bookData: any) => {
        //   return {
        //     id: bookData.id,
        //     id_user: bookData.id_user,
        //     author: bookData.author,
        //     title: bookData.title,
        //     date: new Date(bookData.date),
        //     city: bookData.city,
        //     description: bookData.description,
        //     quantity: bookData.quantity,
        //     lbc: bookData.lbc,
        //     udc: bookData.udc,
        //     ISBN: bookData.ISBN,
        //     publication_type: bookData.publication_type,
        //   };
        // });
        // const formattedUserBooks = userBooksResult.map((book: Book) => {
        //     return {
        //       ...book,
        //       date: new Date(book.date).toISOString().split('T')[0], // Format date to YYYY-MM-DD
        //     };
        //   });

        res.json(userBooksResult);
        // res.json(formattedUserBooks);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
    });

export default router;