import app from './app';

(async () => {
  try {
    const port = 3333;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Not connected to server:', error);
  }
})();