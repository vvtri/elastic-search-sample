import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Injectable()
export class CommentService {
	constructor(private elasticSearch: ElasticsearchService) {}

	async create(createCommentDto: CreateCommentDto) {
		const response = await this.elasticSearch.index({
			index: 'comment',
			document: {
				content: createCommentDto.content,
			},
		})
		console.log('response :>> ', response)
		return 'This action adds a new comment'
	}

	async findAll() {
		return this.elasticSearch.search()
		// return `This action returns all comment`
	}

  async search(keyword: string) {
    return this.elasticSearch.search({
      query: {
        bool: {
          must: {
            match_phrase: {
                content: keyword
            }
          }
        }
      }
    })
  }

	findOne(id: number) {
		return `This action returns a #${id} comment`
	}

	update(id: number, updateCommentDto: UpdateCommentDto) {
		return `This action updates a #${id} comment`
	}

	remove(id: number) {
		return `This action removes a #${id} comment`
	}
}
