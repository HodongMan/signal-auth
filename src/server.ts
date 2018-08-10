import app from "./app";

const PORT = 8000;

(async () => {
    app
      .listen(
        PORT,
        () => console.info(`Server running on port ${PORT}`)
      );
  })();