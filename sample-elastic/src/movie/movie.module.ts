import { Inject, Module, OnModuleInit } from '@nestjs/common'
import { MovieService } from './movie.service'
import { MovieController } from './movie.controller'
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
	controllers: [MovieController],
	providers: [
		MovieService,
		{
			provide: 'index',
			useValue: 'movies',
		},
	],
})
export class MovieModule implements OnModuleInit {
	constructor(
		private elasticSearch: ElasticsearchService,
		@Inject('index') private index: string
	) {}

	async onModuleInit() {
		const isExistIndex = await this.elasticSearch.indices.exists({
			index: this.index,
		})
		if (!isExistIndex) {
			await this.elasticSearch.indices.create({
				index: this.index,
				settings: {},
				mappings: {
					properties: {
						title: {
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

		const autocompleteIdx = await this.elasticSearch.indices.exists({
			index: 'autocomplete',
		})
		if (!autocompleteIdx) {
			await this.elasticSearch.indices.create({
				index: 'autocomplete',
				mappings: {
					properties: {
						title: {
							type: 'search_as_you_type',
						},
					},
				},
			})
		}
	}
}
