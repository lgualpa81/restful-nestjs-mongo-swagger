import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";
import { UserRoleEnum } from "@/modules/auth/enums";

const opts = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

@Schema(opts)
export class User extends Document {
  @Prop({
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
  })
  password: string;

  @Prop({    
    enum: UserRoleEnum,
    default: UserRoleEnum.Reader
  })
  role: UserRoleEnum;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Entity' })
  entityId: string
}

export const UserSchema = SchemaFactory.createForClass(User);
//export type UserDocument = User & Document;