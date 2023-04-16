"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    var _a;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    const configService = app.get(config_1.ConfigService);
    app.setGlobalPrefix('api');
    const port = (_a = configService.get('PORT')) !== null && _a !== void 0 ? _a : 3000;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map