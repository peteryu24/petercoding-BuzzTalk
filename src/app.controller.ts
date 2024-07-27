import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/topic/list')
  async getTopicList(): Promise<any> {
    return await this.appService.getTopicList();
  }

  @Get('/topic/room-count')
  async getRoomCountByTopic(): Promise<any> {
    return await this.appService.getRoomCountByTopic();
  }

  @Post('/player')
  async getOrCreatePlayer(@Body() body): Promise<any> {
    const uuid: string = body.uuid;

    return await this.appService.getOrCratePlayer(uuid);
  }

  @Post('/room/list')
  async getRoomList(@Body() body): Promise<any> {
    const limit: number = body.limit;
    const cursorId: string | undefined = body.cursorId;
    const topicId: number | undefined = body.topicId;

    return await this.appService.getRoomList(topicId, cursorId, limit);
  }

  @Post('/room/create')
  async createRoom(@Body() body): Promise<any> {
    const topicId: number = body.topicId;
    const roomName: string = body.roomName;
    const playerId: number = body.playerId;
    const startTime: Date = new Date(body.startTime);
    const endTime: Date = new Date(body.endTime);

    try {
      await this.appService.createRoom(
        topicId,
        roomName,
        playerId,
        startTime,
        endTime,
      );
      return {
        success: true,
      };
    } catch (e) {
      return {
        success: false,
      };
    }
  }

  @Post('/room/ids')
  async getRooms(@Body() body): Promise<any> {
    const roomIds = body.roomIds;
    return await this.appService.getRoomListByIds(roomIds);
  }
}
