import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

const opts = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

@Schema(opts)
export class Customer extends Document{
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
  })
  phone: string;

  @Prop({
    required: true,
    trim: true,
  })
  email: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Entity' })
  entityId:string
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
//export type CustomerDocument = Customer & Document;