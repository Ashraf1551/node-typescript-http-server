import { promises as fs } from "node:fs";
import path from "node:path";

import type { Player } from "../types";

const DB_PATH = path.join(process.cwd(), "db", "data.json");

class PlayerService {
  private async readData(): Promise<Player[]> {
    try {
      const data = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  private async writeData(data: Player[]) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  }

  async create(player: Omit<Player, "id">) {
    const data = await this.readData();

    const newPlayer: Player = {
      ...player,
      id: String(Math.floor(Math.random() * 100)),
    };

    data.push(newPlayer);

    await this.writeData(data);
  }

  async get(): Promise<Player[]> {
    const data = await this.readData();
    return data;
  }

  async getById(id: string): Promise<Player | null> {
    const data = await this.readData();
    return data.find((player) => player.id === id) || null;
  }

  async update(
    id: string,
    updates: Partial<Omit<Player, "id">>,
  ): Promise<Player | null> {
    const data = await this.readData();

    const index = data.findIndex((player) => player.id === id);

    if (index === -1) return null;

    data[index] = { ...data[index], ...updates } as Player;
    await this.writeData(data);
    return data[index];
  }

  async delete(id: string): Promise<boolean> {
    const data = await this.readData();
    const index = data.findIndex((player) => player.id === id);
    if (index === -1) return false;

    data.splice(index, 1);
    await this.writeData(data);
    return true;
  }
}

export const playerService = new PlayerService();
