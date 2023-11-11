import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailController } from './email/email.controller';
import { TemplateController } from './template/template.controller';
import { EmailService } from './email/email.service';
import { TemplateService } from './template/template.service';
import { MongooseModule } from '@nestjs/mongoose';
import { templateSchema } from './template/schema/template.schema';
import { emailSchema } from './email/schema/email.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.mongoDb),
    MongooseModule.forFeature([{ name: 'Template', schema: templateSchema }, {name : 'Email', schema : emailSchema}])
  ],
  controllers: [AppController, EmailController, TemplateController],
  providers: [AppService, EmailService, TemplateService],
})
export class AppModule {}
