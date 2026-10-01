import { playerService } from "../services/player.service";
import type { Player, Req, Res } from "../types";
import { extractRequestInfo, sendResponse } from "../utils";

export const playerRoute = async (req: Req, res: Res) => {
  const { method, params, body } =
    await extractRequestInfo<Omit<Player, "id">>(req);
  const playerId = params[1]; //  /player/:id

  try {
    // GET /player - list all players
    if (method === "GET" && !playerId) {
      const players = await playerService.get();
      sendResponse(
        res,
        { message: "Players retrieved successfully", data: players },
        200,
      );
      return;
    }

    // GET /player/:id - get player by id
    if (method === "GET" && playerId) {
      const player = await playerService.getById(playerId);
      sendResponse(
        res,
        { data: player, message: player ? undefined : "Not found" },
        player ? 200 : 404,
      );
      return;
    }

    // POST /player - create player
    if (method === "POST" && body) {
      const newPlayer = await playerService.create(body);
      sendResponse(
        res,
        { message: "Player created successfully", data: newPlayer },
        201,
      );
      return;
    }

    // PUT /player/:id - update player
    if (method === "PUT" && playerId && body) {
      const updated = await playerService.update(playerId, body);
      sendResponse(
        res,
        { data: updated, message: updated ? undefined : "Not found" },
        updated ? 200 : 404,
      );
      return;
    }

    // DELETE /player/:id - delete player
    if (method === "DELETE" && playerId) {
      const deleted = await playerService.delete(playerId);
      sendResponse(
        res,
        { message: deleted ? "Player deleted successfully" : "Not found" },
        deleted ? 200 : 404,
      );
      return;
    }

    sendResponse(res, { message: "not allowed" }, 405);
  } catch (error) {
    sendResponse(
      res,
      { message: error instanceof Error ? error.message : "Server error" },
      500,
    );
  }
};
