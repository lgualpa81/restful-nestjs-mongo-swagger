import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

const opts = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

@Schema(opts)
export class Entity extends Document {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
  })
  address: string;

  @Prop({
    required: true,
    trim: true,
  })
  contactEmail: string;
}

export const EntitySchema = SchemaFactory.createForClass(Entity);
//export type EntityDocument = Entity & Document;