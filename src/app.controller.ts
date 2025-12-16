import { Controller, Get, Res } from "@nestjs/common";
import type { Response } from "express";
import { ApiExcludeEndpoint } from "@nestjs/swagger";

@Controller()
export class AppController {
    constructor() {}

    @ApiExcludeEndpoint()
    @Get()
    redirect(@Res() res: Response) {
        return res.redirect('/swagger');
    }
}