import express from 'express';
import sequelize from './models/modelDB.js';
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

// Sync models with database and connect to server
(async () => {
  try {
    await sequelize.sync();
    console.log('Connected to the db at port 5432');
    // Start server
    const port = 3333;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('NOT CONNECTED to the database:', error);
  }
})();
