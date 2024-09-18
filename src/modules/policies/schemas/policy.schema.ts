import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

const opts = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

@Schema(opts)
export class Policy extends Document {
  @Prop({
    required: true,
    trim: true,
  })
  policyNumber: string;

  @Prop({
    required: true,
    trim: true,
  })
  details: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Entity' })
  entityId: string

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Customer' })
  customerId: string
}

export const PolicySchema = SchemaFactory.createForClass(Policy);
//export type PolicyDocument = Policy & Document;