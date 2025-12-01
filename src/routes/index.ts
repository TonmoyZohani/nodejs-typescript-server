import addRoutes from "../helpers/RouteHandler";
import sendJson from "../helpers/sendJson";

addRoutes("GET", "/", (req, res) => {
  sendJson(res, 200, { message: "Hello World", path: req.url });
});

addRoutes("GET", "/api", (req, res) => {
  sendJson(res, 200, { message: "Health Status Ok", path: req.url });
});
