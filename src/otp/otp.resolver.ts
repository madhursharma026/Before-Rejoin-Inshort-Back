import { OtpService } from './otp.service';
import { OtpResponse } from './otp.model';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { MobileNumber } from './mobile-number.entity';

@Resolver()
export class OtpResolver {
  constructor(private readonly otpService: OtpService) {}

  @Mutation(() => OtpResponse)
  async generateOtp(
    @Args('phoneNumber') phoneNumber: string,
  ): Promise<OtpResponse> {
    try {
      const result = await this.otpService.generateOtp(phoneNumber);
      return result;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Mutation(() => OtpResponse)
  async verifyOtp(
    @Args('phoneNumber') phoneNumber: string,
    @Args('otpCode') otpCode: string,
  ): Promise<OtpResponse> {
    try {
      const result = await this.otpService.verifyOtp(phoneNumber, otpCode);
      return result;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Mutation(() => MobileNumber)
  async updateUserProfile(
    @Args('phoneNumber') phoneNumber: string,
    @Args('newName', { nullable: true }) newName?: string, // Make name optional
    @Args('newProfilePhoto', { nullable: true }) newProfilePhoto?: string, // Make profile photo optional
  ): Promise<MobileNumber> {
    return this.otpService.updateUserProfile(
      phoneNumber,
      newName,
      newProfilePhoto,
    );
  }
}
