import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './schemas/customer.schema';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerRepository: Model<Customer>
  ) { }

  async findById(customerId: string): Promise<Customer> {
    const customer: Customer = await this._findByAttr('_id', customerId);
    if (!customer) throw new NotFoundException('Customer not found')
    return customer
  }

  async add(payload: CreateCustomerDto): Promise<Customer> {
    const checkCustomer: Customer = await this._findByAttr('email', payload.email)
    if (checkCustomer) throw new BadRequestException('Customer already exists')

    const customer: Customer = await this.customerRepository.create(payload)
    return customer.save()
  }

  async update(customerId: string, payload: UpdateCustomerDto): Promise<void> {
    const customer: Customer = await this.customerRepository.findOneAndUpdate({
      _id: customerId,
    }, payload)
    if (!customer) throw new NotFoundException('Customer not found')
  }

  async deleteById(customerId: string): Promise<void> {
    const customer: Customer = await this.customerRepository.findOneAndDelete({
      _id: customerId
    })
    if (!customer) throw new NotFoundException('Customer not found')
  }

  private async _findByAttr(attr: string, value: any): Promise<Customer> {
    return await this.customerRepository.findOne({ [attr]: value });
  }
}
