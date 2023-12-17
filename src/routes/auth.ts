import { Router, Response, Request } from 'express';
import { User } from '../models/User';
import db from '../functions/db';
import * as jwt from 'jsonwebtoken';
import config from 'config';

const router = Router();

router.post('/login', (req: Request, res: Response) => {
  const { email, password }: User = req.body;

  const passwordLength = password?.toString().length ?? 0;
  const emailLength = email?.toString().length ?? 0;

  if (emailLength > 50 || emailLength === 0){
    return res.status(400).json({ message: 'Максимальная длина почты 50 символов' });
  }
  if (passwordLength > 30 || passwordLength === 0){
    return res.status(400).json({ message: 'Максимальная длина пароля 50 символов' });
  }


  db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Ошибка входа:', err);
      res.status(500).json({ message: 'Ошибка входа' });
    } else {
      if (results.length > 0) {
        const user: User = results[0];
        // Добавить логику хэширования пароля. (Позже)
        if (user.password === password) {
          // Генерация JWT токена
          const token = jwt.sign(
            { userId: user.id, email: user.email },
            config.get('jwtSecret') as jwt.Secret,
            { expiresIn: '1h' }
          );

          res.json({
            message: 'Вход успешен',
            userId: user.id,
            email: user.email,
            token: token 
          });
        } else {
          res.status(401).json({ message: 'Неверный пароль' });
        }
      } else {
        res.status(404).json({ message: 'Пользователь не найден' });
      }
    }
  });
});

export default router;
