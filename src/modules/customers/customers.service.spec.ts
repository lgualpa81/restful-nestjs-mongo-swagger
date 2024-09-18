import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { getModelToken } from '@nestjs/mongoose';

describe('CustomersService', () => {
  let service: CustomersService;

  const mockCustomerModel = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersService,
        {
          provide: getModelToken('Customer'),
          useValue: mockCustomerModel,
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
