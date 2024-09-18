import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quote } from './schemas/quote.schema';
import { CreateQuoteDto, UpdateQuoteDto } from './dto';

@Injectable()
export class QuotesService {
  constructor(
    @InjectModel(Quote.name)
    private readonly quoteRepository: Model<Quote>
  ) { }

  async findById(quoteId: string) {
    const quote:Quote = await this._findByAttr('_id', quoteId);
    if (!quote) throw new NotFoundException('Quote not found')
    return quote
  }

  async add(payload: CreateQuoteDto):Promise<Quote> {
    const checkQuote:Quote = await this._findByAttr('quoteNumber', payload.quoteNumber)
    if (checkQuote) throw new BadRequestException('Quote already exists')

    const quote:Quote = await this.quoteRepository.create(payload)
    return quote.save()
  }

  async update(quoteId: string, payload: UpdateQuoteDto):Promise<void> {
    const quote = await this.quoteRepository.findOneAndUpdate({
      _id: quoteId,
    }, payload)
    if (!quote) throw new NotFoundException('Quote not found')    
  }

  async deleteById(quoteId: string):Promise<void> {
    const quote = await this.quoteRepository.findOneAndDelete({
      _id: quoteId
    })
    if (!quote) throw new NotFoundException('Quote not found')
  }

  private async _findByAttr(attr: string, value: any):Promise<Quote> {
    return await this.quoteRepository.findOne({ [attr]: value });
  }
}
