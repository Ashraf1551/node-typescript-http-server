import {
  createServer,
  IncomingMessage,
  ServerResponse,
  type Server,
} from "http";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log(req);
  },
);

server.listen(5000, () => {
  console.log("server is running port 5k");
});
