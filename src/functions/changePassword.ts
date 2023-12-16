import { Router, Response, Request } from 'express';
import db from '../functions/db';
import * as jwt from 'jsonwebtoken';
import config from 'config';

const router = Router();

router.post('/changePassword', async (req: Request, res: Response) => {
  const { userId, newPassword } = req.body;

  try {
    const userResult = await db.query('SELECT * FROM user WHERE id = ?', [userId]);
    if (userResult.values?.length === 1) {
      await db.query('UPDATE user SET password = ? WHERE id = ?', [newPassword, userId]);

      return res.status(200).json({ message: 'Пароль успешно изменен' });
    } else {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
  } catch (error) {
    console.error('Ошибка при изменении пароля:', error);
    return res.status(500).json({ message: 'Ошибка при изменении пароля' });
  }
});

export default router;
