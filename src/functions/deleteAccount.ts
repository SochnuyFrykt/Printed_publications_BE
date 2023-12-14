import { Router, Response, Request } from 'express';
import db from '../functions/db';
import * as jwt from 'jsonwebtoken';
import config from 'config';

const router = Router();

router.post('/deleteAccount', async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    // Проверяем, существует ли пользователь с указанным userId
    const userResult = await db.query('SELECT * FROM user WHERE id = ?', [userId]);
    if (userResult.values?.length === 1) {
      await db.query('DELETE FROM user WHERE id = ?', [userId]);

      return res.status(200).json({ message: 'Аккаунт успешно удален' });
    } else {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
  } catch (error) {
    console.error('Ошибка при удалении аккаунта:', error);
    return res.status(500).json({ message: 'Ошибка при удалении аккаунта' });
  }
});

export default router;