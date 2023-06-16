import app from './app'
import sequelize from './models/modelDB';

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

