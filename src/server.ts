import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import addRoutes, { RouteHandler, routes } from "./helpers/RouteHandler";
import "./routes/index";

// addRoutes("GET", "/", (req, res) => {
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.end(JSON.stringify({ message: "Hello World", path: req.url }));
// });

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log(`Server is running`);

    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";

    const mapMethod = routes.get(method);
    const handler: RouteHandler | undefined = mapMethod?.get(path);

    if (handler) {
      handler(req, res);
      return;
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route Not Found", path: req.url }));
    }
  }
);

server.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});
