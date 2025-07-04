import { Module } from '@nestjs/common';
import { FollowRequestController } from './follow-request.controller';
import { FollowRequestService } from './follow-request.service';
import { FollowRequestRepository } from './follow-request.repository';
import { JwtService } from '@nestjs/jwt';
import { FollowerRepository } from '../follower/follower.repository';
import { NotificationRepository } from '../notification/notification.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [FollowRequestController],
  providers: [FollowRequestService,FollowRequestRepository,JwtService,FollowerRepository,NotificationRepository,UserRepository]
})
export class FollowRequestModule {}
