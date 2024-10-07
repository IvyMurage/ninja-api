import { Controller } from '@nestjs/common';

@Controller('ninjas')
export class NinjasController {}

//controllers in nest are used to define routes
// They are used to handle incoming requests to specific endpoints
// (or routes) and determine what response to send back to the client.
// controllers are marked with @controller decorator
// we used decorators like @get, @post, @put, @delete to define the routes