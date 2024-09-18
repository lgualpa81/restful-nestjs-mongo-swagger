import { Test, TestingModule } from '@nestjs/testing';
import { QuotesService } from './quotes.service';
import { getModelToken } from '@nestjs/mongoose';

describe('QuotesService', () => {
  let service: QuotesService;
  const mockQuoteModel = {
    findOne: jest.fn(),
    create: jest.fn(),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuotesService,
        {
          provide: getModelToken('Quote'),
          useValue: mockQuoteModel,
        },
      ],
    }).compile();

    service = module.get<QuotesService>(QuotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
