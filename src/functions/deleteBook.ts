import { Router, Response, Request } from 'express';
import db from '../functions/db';
import * as jwt from 'jsonwebtoken';
import config from 'config';

const router = Router();

router.post('/deleteBook', async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const userResult = await db.query('SELECT * FROM book WHERE id = ?', [id]);
    if (userResult.values?.length === 1) {
      await db.query('DELETE FROM book WHERE id = ?', [id]);
        
      return res.status(200).json({ message: 'Книга успешно удалена' });
    } else {
      return res.status(404).json({ message: 'Книга не найдена' });
    }
  } catch (error) {
    console.error('Ошибка при удалении книги:', error);
    return res.status(500).json({ message: 'Ошибка при удалении книги' });
  }
});

export default router;