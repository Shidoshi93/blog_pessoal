import { Module } from "@nestjs/common";
import { BcryptService } from "./bcrypt/bcrypt";

@Module({
    imports: [],
    controllers: [],
    providers: [BcryptService],
    exports: [BcryptService],
})
export class AuthModule { }