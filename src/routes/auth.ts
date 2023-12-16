import { Router, Response, Request } from 'express';
import { User } from '../models/User';
import db from '../functions/db'
import * as jwt from 'jsonwebtoken';
import config from 'config'

const router = Router();


router.post('/login', (req: Request, res: Response) => {
    const { email, password }: User = req.body;
  
    db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error('Ошибка входа:', err);
        res.status(500).json({ message: 'Ошибка входа' });
      } else {
        if (results.length > 0) {
          const user: User = results[0];
          //Добавить логику хэширования пароля. (Позже)
          if (user.password === password) {
            res.json({ message: 'Вход успешен', userId: user.id, 
            email: user.email, password: user.password });
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