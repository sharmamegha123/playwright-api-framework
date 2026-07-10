import app from "./app";

export function startServer(port = 3001) {
  return app.listen(port, () => {
    console.log(`Provider running on ${port}`);
  });
}