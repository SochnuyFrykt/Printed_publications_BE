import express, { Request, Response } from 'express';
import mysql from 'mysql';
import { User } from './models/User';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'mydatabase',
});

db.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
  } else {
    console.log('Подключено к базе данных');
  }
});

app.post('/register', (req: Request, res: Response) => {
  const { username, password }: User = req.body;

  const user: User = { username, password };

  db.query('INSERT INTO users SET ?', user, (err) => {
    if (err) {
      console.error('Ошибка регистрации:', err);
      res.status(500).json({ message: 'Ошибка регистрации' });
    } else {
      res.json({ message: 'Пользователь успешно зарегистрирован' });
    }
  });
});

app.post('/login', (req: Request, res: Response) => {
  const { username, password }: User = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Ошибка входа:', err);
      res.status(500).json({ message: 'Ошибка входа' });
    } else {
      if (results.length > 0) {
        const user: User = results[0];

        // Здесь вы можете добавить логику проверки пароля
        // Например, используйте bcrypt для сравнения хешированных паролей

        // В данном примере, мы сравниваем просто пароль
        if (user.password === password) {
          res.json({ message: 'Вход успешен' });
        } else {
          res.status(401).json({ message: 'Неверный пароль' });
        }
      } else {
        res.status(404).json({ message: 'Пользователь не найден' });
      }
    }
  });
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Привет, мир!' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
