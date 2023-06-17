import express from 'express';
import cors from 'cors';
import router from './router.js';
import session from 'express-session';

const app = express();
const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(
  session({
    name: 'sid',
    cookie: {
      httpOnly: false,
      secure: false,
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 60,
    },
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors(corsConfig));
app.use(express.json());

app.use('/', router);

app.get('*', (req, res) => {
  res.status(404).send('Sorry, not found 😞');
});

export default app;