import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { CreateNinjaDto } from "./dto/create-ninja.dto";
import { UpdateProductDto } from "./dto/update-ninja.dto";
import { NinjasService } from "./ninjas.service";

@Controller("ninjas")
export class NinjasController {

    constructor(private readonly ninjasService: NinjasService){}
  @Get()
  getNinjas(@Query() query: { weapon: string }) {
    console.log(query);
    return  this.ninjasService.getAllNinjas(query.weapon);
  }

  @Get(":id")
  getOneNinja(@Param("id") id: string) {
    return { id };
  }

  @Post()
  createNinja(@Body() createNinjaDto: CreateNinjaDto) {
    return { createNinjaDto };
  }

  @Put(":id")
  updateNinja(
    @Param("id") id: string,
    @Body() udateNinjaDto: UpdateProductDto,
  ) {
    return { id, udateNinjaDto };
  }

  @Patch(":id")
  updateNinjaPatch(
    @Param("id") id: string,
    @Body() updatNinjaPatchDto: UpdateProductDto,
  ) {
    return { id, updatNinjaPatchDto };
  }

  @Delete(":id")
  deleteNinja(@Param("id") id: string) {
    return { id };
  }
}
//controllers in nest are used to define routes
// They are used to handle incoming requests to specific endpoints
// (or routes) and determine what response to send back to the client.
// controllers are marked with @controller decorator
// we used decorators like @get, @post, @put, @delete to define the routes
