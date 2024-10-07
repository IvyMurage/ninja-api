import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NinjasModule } from './ninjas/ninjas.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [NinjasModule, UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// used to group a closely related set of capabilities
// AppModule is the root module of the application
// e.g modules for users, products, etc.
// controllers and providers are part of the module
// controllers handle incoming requests
// providers are responsible for handling the business logic
// AppModule is the root module of the application