import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentModule } from './comment/comment.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [CommentModule, MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
