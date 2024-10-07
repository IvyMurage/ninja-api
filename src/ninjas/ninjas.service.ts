import { Injectable } from "@nestjs/common";
import * as Ninjas from "./data/ninja.mock.json";
import { CreateNinjaDto } from "./dto/create-ninja.dto";
import * as fs from "fs/promises";
import * as path from "path";

@Injectable()
export class NinjasService {
  private ninjas: any[] = [];

  constructor() {
    this.loadData();
  }

  private filePath() {
    return path.join(__dirname, "data/ninja.mock.json");
  }

  private async loadData() {
    try {
        console.log(this.filePath());
      const ninjas = await fs.readFile(this.filePath());
      this.ninjas = JSON.parse(ninjas.toString()).ninjas;
    } catch (error) {
      console.log(error);
    }
  }
  private async saveData() {
    try {
      await fs.writeFile(
        this.filePath(),
        JSON.stringify({ ninjas: this.ninjas }, null, 2),
     "utf-8" );
    } catch (error) {
      console.log(error);
      throw new Error("Could not save data");
    }
  }

  async getAllNinjas(weapon?: string): Promise<any[]> {
    try {
      if (weapon) {
        return this.ninjas.filter((ninja) => ninja.weapon === weapon);
      }
      return this.ninjas;
    } catch (error) {}
  }

  async getNinja(id: string): Promise<any> {
    try {
      return this.ninjas.find((ninja) => ninja.id === Number(id));
    } catch (error) {}
  }

  async createNinja(ninja: CreateNinjaDto): Promise<any> {
    const newNinja = {
      id: this.ninjas.length + 1,
      ...ninja,
    };
    this.ninjas.push(newNinja);
    await this.saveData();
    return newNinja;
  }
}
