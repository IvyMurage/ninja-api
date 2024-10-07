import { Injectable } from "@nestjs/common";
import * as Ninjas from "./data/ninja.mock.json";
import { CreateNinjaDto } from "./dto/create-ninja.dto";

@Injectable()
export class NinjasService {
  private ninjas: any[] = [];
  constructor() {
    this.ninjas = Ninjas.ninjas;
  }

  getAllNinjas(weapon?: string ) {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }
    return this.ninjas;
  }

  getNinja(id: string) {
    return this.ninjas.find((ninja) => ninja.id === id);
  }

  createNInja(ninja: CreateNinjaDto) {
    const newNinja = {
      id: this.ninjas.length + 1,
      ...ninja,
    };
    this.ninjas.push(newNinja);
    return newNinja;
  }
}
