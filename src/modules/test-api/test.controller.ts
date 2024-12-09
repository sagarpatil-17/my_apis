import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('TestController')
@Controller('test')

export class TestController {

    @Get()
    async test() {
        return { message: 'Apis are working..' }
    }

}