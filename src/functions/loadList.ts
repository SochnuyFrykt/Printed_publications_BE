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
        res.json(userBooksResult);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
    });

export default router;