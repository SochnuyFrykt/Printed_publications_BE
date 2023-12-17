import { Router, Response, Request } from 'express';
import { User } from '../models/User';
import db from '../functions/db';
import * as jwt from 'jsonwebtoken';
import config from 'config';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  const { email, password }: User = req.body;

  const userExists = await checkUser(email);

  if (userExists) {
    return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
  }

  const passwordLength = password?.toString().length ?? 0;
  const emailLength = email?.toString().length ?? 0;

  if (emailLength > 50 || emailLength === 0){
    return res.status(400).json({ message: 'Максимальная длина почты 50 символов' });
  }
  if (passwordLength > 30 || passwordLength === 0){
    return res.status(400).json({ message: 'Максимальная длина пароля 50 символов' });
  }

  const user: User = { email, password };

  db.query('INSERT INTO user SET ?', user, (err) => {
    if (err) {
      console.error('Ошибка регистрации:', err);
      res.status(500).json({ message: 'Ошибка регистрации' });
    } else {
      res.json({ message: 'Пользователь успешно зарегистрирован' });
    }
  });
});

async function checkUser(email: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length > 0);
      }
    });
  });
}

export default router;