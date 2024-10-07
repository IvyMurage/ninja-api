import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
} from "@nestjs/common";
import { CreateNinjaDto } from "./dto/create-ninja.dto";
import { UpdateProductDto } from "./dto/update-ninja.dto";
import { NinjasService } from "./ninjas.service";
import { Response } from "express";
@Controller("ninjas")
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}
  @Get()
  getNinjas(@Query() query: { weapon: string }) {
    return this.ninjasService.getAllNinjas(query.weapon);
  }

  @Get(":id")
  getOneNinja(@Param("id") id: string) {
    const ninja = this.ninjasService.getNinja(id);
    return ninja;
  }

  

  @Post()
  createNinja(@Body() createNinjaDto: CreateNinjaDto) {
    return this.ninjasService.createNinja(createNinjaDto);
  }

  @Put(":id")
  updateNinja(@Param("id") id: string, @Body() updatedNinja: UpdateProductDto) {
    return this.ninjasService.updateNinja(id, updatedNinja);
  }

  @Patch(":id")
  updateNinjaPatch(
    @Param("id") id: string,
    @Body() updatNinjaPatchDto: UpdateProductDto,
  ) {
    return { id };
  }

  @Delete(":id")
  deleteNinja(@Param("id") id: string, @Res() res: Response) {
    const message = res
      .status(HttpStatus.OK)
      .send({ message: this.ninjasService.removeNinja(id) });
    res.status(HttpStatus.OK).send({ message });
  }
}
//controllers in nest are used to define routes
// They are used to handle incoming requests to specific endpoints
// (or routes) and determine what response to send back to the client.
// controllers are marked with @controller decorator
// we used decorators like @get, @post, @put, @delete to define the routes
