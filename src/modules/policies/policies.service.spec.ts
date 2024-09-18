import { Test, TestingModule } from '@nestjs/testing';
import { PoliciesService } from './policies.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Policy } from './schemas/policy.schema';
import { NotFoundException } from '@nestjs/common';

describe('PoliciesService', () => {
  let service: PoliciesService;
  let policyModel: Model<Policy>;
  const mockPolicyModel = {
    findOne: jest.fn().mockResolvedValue(null), // Por defecto, no encuentra ninguna política
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoliciesService,
        {
          provide: getModelToken(Policy.name),
          useValue: mockPolicyModel,
        }
      ],
    }).compile();

    service = module.get<PoliciesService>(PoliciesService);
    policyModel = module.get<Model<Policy>>(getModelToken(Policy.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findById', () => {
    it('debería lanzar NotFoundException si no encuentra la política', async () => {
      mockPolicyModel.findOne.mockResolvedValue(null);

      await expect(service.findById('someInvalidId')).rejects.toThrow(NotFoundException);
      expect(mockPolicyModel.findOne).toHaveBeenCalledWith({ _id: 'someInvalidId' });
    });

    // it('debería retornar la política si la encuentra', async () => {
    //   const mockPolicy = { _id: 'someValidId', name: 'Test Policy' } as Policy;
    //   mockPolicyModel.findOne.mockResolvedValue(mockPolicy);

    //   const result = await service.findById('someValidId');
    //   expect(result).toEqual(mockPolicy);
    //   expect(mockPolicyModel.findOne).toHaveBeenCalledWith({ _id: 'someValidId' });
    // });
  });
});
