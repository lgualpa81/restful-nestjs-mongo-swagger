import { Test, TestingModule } from '@nestjs/testing';
import { PoliciesController } from './policies.controller';
import { PoliciesService } from './policies.service';
import { Policy } from './schemas/policy.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('PoliciesController', () => {
  let controller: PoliciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliciesController],
      providers: [PoliciesService,
        {
          provide: getModelToken(Policy.name),
          useValue: {},
        }
      ],
    }).compile();

    controller = module.get<PoliciesController>(PoliciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
