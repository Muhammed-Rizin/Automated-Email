import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Template extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  resume: string;

  @Prop({ default: false })
  isDeleted: boolean;

//   @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
//   userId: User['_id'];
}

export const templateSchema = SchemaFactory.createForClass(Template);
