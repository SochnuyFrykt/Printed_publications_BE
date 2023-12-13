import express from 'express';
import authRouter from './routes/auth';
import registerRouter from './routes/register'
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/register', registerRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
