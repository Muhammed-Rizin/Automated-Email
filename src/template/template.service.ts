import { Injectable } from '@nestjs/common';
import { CreateTemplateDto, TemplateDto } from './dto/template.dto';
import { Response } from 'express'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';

@Injectable()
export class TemplateService {
    constructor(
        @InjectModel('Template') private _templateModel : Model<TemplateDto>
    ){}

    async addTemplate(template : CreateTemplateDto, res : Response){
        try {
            const newTemplate = new this._templateModel(template)
            await newTemplate.save()
            return res.status(201).json({message : 'New file added'})
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({message : 'Internal server error'})
        }
    }

    async getTemplates(res : Response) {
        try {
            const templates : TemplateDto[] = await this._templateModel.find({isDeleted : false}).sort({_id : -1})
            return res.status(200).json(templates)
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({message : 'Internal server error'})
        }
    }

    async getTemplate(id : string, res: Response){
        try {
            const template : TemplateDto = await this._templateModel.findById(id)
            return res.status(200).json(template)
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({message : 'Internal server error'})
        }
    }

    async deleteTemplate(id : string, res: Response) {
        try {
            await this._templateModel.findByIdAndUpdate(id, {$set : {isDeleted : true}})
            res.status(200).json({message : 'Success'})
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({message : 'Internal server error'})
        }
    }

    async getTemplateFromTrash(res : Response){
        try {
            const templates : TemplateDto[] = await this._templateModel.find({isDeleted : true}).sort({_id : -1})
            return res.status(200).json(templates)
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({message : 'Internal server error'})
        }
    }

    async deleteFromTrash(id : string, res : Response){
        try{
            await this._templateModel.findByIdAndDelete(id)
            res.status(200).json({message : 'success'})
        }catch(error){
            console.log(error.message)
            return res.status(500).json({message : 'Internal server error'})
        }
    }

    async recoverFromTrash(id : string, res : Response) {
        try {
            await this._templateModel.findByIdAndUpdate(id, {$set : {isDeleted : false}})
            res.status(200).json({message : 'Success'})
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({message : 'Internal server error'})
        }
    }
}
