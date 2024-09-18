import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Policy } from './schemas/policy.schema';
import { Model } from 'mongoose';
import { CreatePolicyDto, UpdatePolicyDto } from './dto';

@Injectable()
export class PoliciesService {
  constructor(
    @InjectModel(Policy.name)
    private readonly policyRepository: Model<Policy>
  ) { }

  async findById(policyId: string): Promise<Policy> {
    const policy: Policy = await this._findByAttr('_id', policyId);
    if (!policy) throw new NotFoundException('Policy not found')
    return policy
  }

  async add(payload: CreatePolicyDto): Promise<Policy> {
    const checkPolicy: Policy = await this._findByAttr('policyNumber', payload.policyNumber)
    if (checkPolicy) throw new BadRequestException('Policy already exists')

    const policy: Policy = await this.policyRepository.create(payload)
    return policy.save()
  }

  async update(policyId: string, payload: UpdatePolicyDto): Promise<void> {
    const policy: Policy = await this.policyRepository.findOneAndUpdate({
      _id: policyId,
    }, payload)
    if (!policy) throw new NotFoundException('Policy not found')
  }

  async deleteById(policyId: string): Promise<void> {
    const policy: Policy = await this.policyRepository.findOneAndDelete({
      _id: policyId
    })
    if (!policy) throw new NotFoundException('Policy not found')
  }

  private async _findByAttr(attr: string, value: any): Promise<Policy> {
    return await this.policyRepository.findOne({ [attr]: value });
  }
}
