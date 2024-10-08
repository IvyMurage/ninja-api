import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateNinjaDto } from "./dto/create-ninja.dto";
import * as fs from "fs/promises";
import * as path from "path";
import { UpdateProductDto } from "./dto/update-ninja.dto";
import NotFoundError from "src/exceptions/not-found.exception";

@Injectable()
export class NinjasService {
  private ninjas: any[] = [];

  constructor() {
    this.loadData();
  }

  private filePath() {
    return path.join(__dirname, "../../src/ninjas/data/ninja.mock.json");
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
        "utf-8",
      );
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
    const ninja = this.ninjas.find((ninja) => ninja.id === Number(id));
    if (!ninja) throw new NotFoundError("Ninja", id);
    return this.ninjas.find((ninja) => ninja.id === Number(id));
  }

  async createNinja(ninja: CreateNinjaDto): Promise<any> {
    try {
      const newNinja = {
        id: this.ninjas.length + 1,
        ...ninja,
      };
      this.ninjas.push(newNinja);
      await this.saveData();
      return newNinja;
    } catch (error) {
      throw error;
    }
  }

  async updateNinja(id: string, ninja: UpdateProductDto): Promise<any> {
    try {
      const index = this.ninjas.findIndex((ninja) => ninja.id === Number(id));
      if (index === -1) throw new NotFoundError("ninja", id);
      const updatedNinja = {
        ...this.ninjas[index],
        ...ninja,
      };
      this.ninjas[index] = updatedNinja;
      await this.saveData();
      return updatedNinja;
    } catch (error) {
      throw error;
    }
  }

  async removeNinja(id: string) {
    try {
      const filteredNinjaIndex = this.ninjas.findIndex(
        (ninja) => ninja.id === Number(id),
      );
      if (filteredNinjaIndex === -1) throw new NotFoundError("ninja", id);
      this.ninjas.splice(filteredNinjaIndex, 1);
      await this.saveData();
    } catch (error) {
      throw error;
    }
  }
}
