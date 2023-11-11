import { Body, Controller, Delete, Get, Patch, Post, Query, Res } from '@nestjs/common';
import { TemplateService } from './template.service';
import { Response } from 'express';
import { CreateTemplateDto, TemplateDto } from './dto/template.dto';

@Controller('template')
export class TemplateController {
    constructor(
        private _templateService : TemplateService
    ){}

    // POST template/add_template
    @Post('add_template')
    addTemplate(
        @Body('data') template : CreateTemplateDto,
        @Res() res : Response
    ) {
        return this._templateService.addTemplate(template, res)
    }

    // GET template/get_templates
    @Get('get_templates')
    getTemplates(
        @Res() res : Response
    ){
        return this._templateService.getTemplates(res)
    }

    // GET template/get_templates
    @Get('get_template')
    getTemplate(
        @Query('id') id : string,
        @Res() res : Response
    ){
        return this._templateService.getTemplate(id, res)
    }
    
    // DELETE template/delete_template
    @Delete('delete_template')
    deleteTemplate(
        @Query('id') id : string,
        @Res() res : Response
    ){
        return this._templateService.deleteTemplate(id, res)
    }

    @Get('get_template_trash')
    getTemplateFromTrash(
        @Res() res : Response
    ) {
        return this._templateService.getTemplateFromTrash(res)
    }

    @Delete('delete_from_trash')
    deleteFromTrash(
        @Query('id') id : string,
        @Res() res: Response
    ){
        return this._templateService.deleteFromTrash(id, res)
    }

    @Patch('recover')
    recover(
        @Query('id') id : string,
        @Res() res: Response
    ){
        this._templateService.recoverFromTrash(id, res)
    }
}
