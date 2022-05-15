import { Module, OnModuleInit } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CommentController } from './comment.controller'
import {
	ElasticsearchModule,
	ElasticsearchService,
} from '@nestjs/elasticsearch'

@Module({
	imports: [
		ElasticsearchModule.register({
			node: 'http://localhost:9200',
			auth: {
				username: 'elastic',
				password: 'elastic',
			},
		}),
	],
	controllers: [CommentController],
	providers: [CommentService],
})
export class CommentModule implements OnModuleInit {
	constructor(private elasticSearch: ElasticsearchService) {}

	async onModuleInit() {
		const index = 'comment'
		try {
			const response = await this.elasticSearch.indices.exists({ index })
			if (!response) {
				this.elasticSearch.indices.create({
					index,
					mappings: {
						properties: {
							content: {
								type: 'text',
								fields: {
									raw: {
										type: 'keyword',
									},
								},
							},
						},
					},
				})
			}
		} catch (error) {
			console.log(error)
		}
	}
}
