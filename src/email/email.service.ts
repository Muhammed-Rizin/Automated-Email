import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import { TemplateDto } from 'src/template/dto/template.dto';
import * as path from 'path'
import { EmailDto } from './dto/email.dto';

@Injectable()
export class EmailService {
    private readonly transporter;
    constructor(
        @InjectModel('Template') private _templateModel : Model<TemplateDto>,
        @InjectModel('Email') private _emailModel : Model<EmailDto>
    ){
        this.transporter = nodemailer.createTransport({
            host: process.env.host,
            post: process.env.post,
            secure: process.env.secure,
            requireTLS: process.env.requireTLS,
            auth: {
                user: process.env.user,
                pass: process.env.pass
            }
        });
    }


    async sendMail(to: string, id : string, res : Response) {
        try {
            const alreadyMail = await this._emailModel.findOne({to : to})
            if(alreadyMail){
                return res.status(409).json({message : 'Already mail'})
            }
            const templateData : TemplateDto = await this._templateModel.findById(id)
            const formattedUserInput = templateData.content.replace(/\n/g, '<br>');
            const filePath = path.resolve(__dirname, '../../public/Muhammed Rizin Azeez.pdf')
            const mailOptions = {
                from : 'rizin7427@gmail.com',
                to : to,
                subject : templateData.title,
                html : formattedUserInput,
                attachments: [
                    {
                      filename: 'muhammed_rizin_azeez.pdf',
                      path: filePath
                    }
                ]
            }
            // this.transporter.sendMail(mailOptions);
            this.addEmail(to, templateData, res)
            res.status(200).json({message : 'success'})
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({message : 'Internal server error'})
        }
    }


    async getHistory(res : Response){
        try {
            const data = await this._emailModel.find().sort({_id : -1})
            res.status(200).json(data)
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({message : 'Internal server error'})
        }
    }

    async addEmail(to : string, templateData : TemplateDto, res : Response) {
        try {
            const newEmail = new this._emailModel({
                to : to,
                title : templateData.title,
                content : templateData.content
            })
            await newEmail.save()
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({message : 'Internal server error'})
        }
    }


}
