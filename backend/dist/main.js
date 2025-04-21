"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'https://veteralia.netlify.app',
            'https://www.veteralia.netlify.app',
            'https://veteralia-beta-sgjnj.netlify.app',
            'https://veteralia-beta.windsurf.build',
            'http://localhost:3000',
        ],
        credentials: true,
    });
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map