import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

const opts = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

@Schema(opts)
export class Quote extends Document {  
  @Prop({
    required: true,
    trim: true,
  })
  quoteNumber: string;
  
  @Prop({
    required: true,
    trim: true,
  })
  policyDetails: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Entity' })
  entityId: string

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Customer' })
  customerId: string
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
//export type QuoteDocument = Quote & Document;