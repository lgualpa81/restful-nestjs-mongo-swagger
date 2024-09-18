import { Test, TestingModule } from '@nestjs/testing';
import { EntitiesService } from './entities.service';
import { getModelToken } from '@nestjs/mongoose';

describe('EntitiesService', () => {
  let service: EntitiesService;
  const mockEntityModel = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntitiesService,
        {
          provide: getModelToken('Entity'),
          useValue: mockEntityModel,
        },
      ],
    }).compile();

    service = module.get<EntitiesService>(EntitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
