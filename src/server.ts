import express from 'express';
import authRouter from './routes/auth';
import registerRouter from './routes/register'
import changePassword from './functions/changePassword'
import changeEmail from './functions/changeEmail'
import deleteAccount from './functions/deleteAccount'
import loadList from './functions/loadList'
import editBook from './functions/editBook'
import deleteBook from './functions/deleteBook'
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/register', registerRouter)
app.use('/cp',changePassword)
app.use(changeEmail)
app.use(deleteAccount)
app.use(loadList)
app.use(editBook)
app.use(deleteBook)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
