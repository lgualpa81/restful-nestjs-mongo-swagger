import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './shared/config';

import { EntitiesModule } from './modules/entities/entities.module';
import { CustomersModule } from './modules/customers/customers.module';
import { PoliciesModule } from './modules/policies/policies.module';
import { QuotesModule } from './modules/quotes/quotes.module';


@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(envs.mongo_uri),
    UsersModule,
    EntitiesModule,
    CustomersModule,
    PoliciesModule,
    QuotesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
