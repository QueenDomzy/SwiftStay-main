import { Controller, Get, Post, Delete, Body, Param, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('dashboard')
  getDashboard(@Req() req: any) {
    if (req.user.role !== 'ADMIN') throw new ForbiddenException('Access denied');
    return this.adminService.getDashboardStats();
  }

  @Post('hotels')
  createHotel(@Body() body: any, @Req() req: any) {
    if (req.user.role !== 'ADMIN') throw new ForbiddenException('Access denied');
    return this.adminService.createHotel(body);
  }

  @Delete('hotels/:id')
  deleteHotel(@Param('id') id: string, @Req() req: any) {
    if (req.user.role !== 'ADMIN') throw new ForbiddenException('Access denied');
    return this.adminService.deleteHotel(Number(id));
  }
}
