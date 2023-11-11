import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Email extends Document {
    @Prop({ required: true })
    to: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    //   @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    //   userId: User['_id'];
}

export const emailSchema = SchemaFactory.createForClass(Email);
