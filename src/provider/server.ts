import app from "./app";

const server = app.listen(3001, () => {
    console.log("Provider running on port 3001");
});

export default server;