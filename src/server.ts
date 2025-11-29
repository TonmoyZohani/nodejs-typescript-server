import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log(`Server is running`);

    if (req.url === "/" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Hello World", path: req.url }));
    }

    if (req.url === "/api" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Health Status Ok", path: req.url }));
    }

    if (req.url === "/api/users" && req.method === "POST") {
      // const user = {
      //   id: 1,
      //   name: "John Doe",
      //   email: "johndoe@gmail.com",
      //   phone: "+919876543210",
      //   address: "123 Main Street, New York, NY 10012",
      // };

      // res.writeHead(200, { "Content-Type": "application/json" });
      // res.end(JSON.stringify(user));

      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        try {
          const user = JSON.parse(body);
          console.log(user);
          console.log("Cacthing the server");
          res.end(JSON.stringify(user));
        } catch (e) {
          res.end(JSON.stringify({ message: "Invalid JSON" }));
        }
      });
    }
  }
);

server.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});
