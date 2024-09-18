import { Test, TestingModule } from '@nestjs/testing';
import { EntitiesController } from './entities.controller';
import { EntitiesService } from './entities.service';
import { Entity } from './schemas/entity.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('EntitiesController', () => {
  let controller: EntitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntitiesController],
      providers: [EntitiesService,
        {
          provide: getModelToken(Entity.name),
          useValue: {},
        }
      ],
    }).compile();

    controller = module.get<EntitiesController>(EntitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
