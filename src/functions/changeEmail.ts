import { Router, Response, Request } from 'express';
import db from '../functions/db';
import * as jwt from 'jsonwebtoken';
import config from 'config';

const router = Router();

router.post('/changeEmail', async (req: Request, res: Response) => {
  const { userId, newEmail } = req.body;

  try {
    // Проверяем, существует ли пользователь с указанным userId
    const userResult = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    if (userResult.values?.length === 1) {
      await db.query('UPDATE users SET username = ? WHERE id = ?', [newEmail, userId]);

      return res.status(200).json({ message: 'Почта успешно изменена' });
    } else {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
  } catch (error) {
    console.error('Ошибка при изменении почты:', error);
    return res.status(500).json({ message: 'Ошибка при изменении почты' });
  }
});

export default router;