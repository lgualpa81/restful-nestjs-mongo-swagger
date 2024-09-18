import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entity } from './schemas/entity.schema';
import { CreateEntityDto, UpdateEntityDto } from './dto';

@Injectable()
export class EntitiesService {
  private logger = new Logger('EntityService')
  constructor(
    @InjectModel(Entity.name)
    private readonly entityRepository: Model<Entity>
  ) { }

  async findById(entityId: string): Promise<Entity> {
    const entity: Entity = await this._findByAttr('_id', entityId)
    if (!entity) throw new NotFoundException('Entity not found')
    return entity
  }

  async add(payload: CreateEntityDto): Promise<Entity> {
    const checkEntity: Entity = await this._findByAttr('contactEmail', payload.contactEmail)
    if (checkEntity) throw new BadRequestException('Entity already exists')

    const entity: Entity = await this.entityRepository.create(payload)
    return entity.save()
  }

  async update(entityId: string, payload: UpdateEntityDto): Promise<void> {
    const entity: Entity = await this.entityRepository.findOneAndUpdate({
      _id: entityId
    }, payload)
    if (!entity) throw new NotFoundException('Entity not found')
  }

  async deleteById(entityId: string): Promise<void> {
    const entity: Entity = await this.entityRepository.findOneAndDelete({
      _id: entityId
    })
    if (!entity) throw new NotFoundException('Entity not found')
  }

  private async _findByAttr(attr: string, value: any): Promise<Entity> {
    return await this.entityRepository.findOne({ [attr]: value });
  }

}
