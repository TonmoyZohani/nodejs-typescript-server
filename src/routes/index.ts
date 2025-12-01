import parseBody from "../helpers/parseBody";
import addRoutes from "../helpers/RouteHandler";
import sendJson from "../helpers/sendJson";

addRoutes("GET", "/", (req, res) => {
  sendJson(res, 200, { message: "Hello World", path: req.url });
});

addRoutes("GET", "/api", (req, res) => {
  sendJson(res, 200, { message: "Health Status Ok", path: req.url });
});

addRoutes("POST", "/api/users", async (req, res) => {
  const body = await parseBody(req);
  sendJson(res, 200, { success: true, data: body, message: "User Created" });
});
