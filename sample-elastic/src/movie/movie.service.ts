import { Inject, Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'

@Injectable()
export class MovieService {
	constructor(
		private elasticSearch: ElasticsearchService,
		@Inject('index') private index: string
	) {}

	create(createMovieDto: CreateMovieDto) {
		return 'This action adds a new movie'
	}

	async searchStartWars() {
		return this.elasticSearch.search({
			index: this.index,
			from: 0,
			size: 20,
			query: {
				bool: {
					must: [
						{
							match_phrase: {
								title: {
									query: 'war',
									slop: 1,
								},
							},
						},
						{
							match: {
								genres: {
									query: 'Biography',
								},
							},
						},
					],
					must_not: {
						match: {
							title: 'trek',
						},
					},
					filter: {
						range: {
							year: {
								gt: 2000,
								lte: 2022,
							},
						},
					},
				},
			},
			body: {
				sort: [
					{
						'title.raw': {
							order: 'asc',
						},
					},
				],
			},
			// sort: ['title.raw:asc', 'year:desc'],
		})
	}

	async searchFuzzy() {
		return this.elasticSearch.search({
			index: this.index,
			size: 200,
			query: {
				bool: {
					must: [
						{
							fuzzy: {
								title: {
									value: 'batman x',
									fuzziness: 2,
								},
							},
						},
					],
				},
			},
		})
	}

	async searchPartial() {
		return this.elasticSearch.search({
			index: this.index,
			query: {
				prefix: {
					title: 'wa',
				},
			},
		})
	}

	async searchWildcard() {
		return this.elasticSearch.search({
			index: this.index,
			query: {
				wildcard: {
					title: '20*',
				},
			},
		})
	}

	async searchRegex() {
		return this.elasticSearch.search({
			index: this.index,
			query: {
				regexp: {
					title: {
						value: 'ow*r',
						case_insensitive: true,
					},
				},
			},
		})
	}

	async autocomplete() {
		return this.elasticSearch.search({
			index: 'autocomplete',
			query: {
				multi_match: {
					query: 'Sta',
					type: 'bool_prefix',
					fields: ['title', 'title._2gram', 'title._3gram'],
				},
			},
		})
	}

	async aggs() {
		return this.elasticSearch.search({
			size: 0,
			index: this.index,
			aggs: {
				whole_year: {
					histogram: {
						field: 'year',
						interval: 10,
					},
				},
			},
		})
	}

	findAll() {
		return `This action returns all movie`
	}

	findOne(id: number) {
		return `This action returns a #${id} movie`
	}

	update(id: number, updateMovieDto: UpdateMovieDto) {
		return `This action updates a #${id} movie`
	}

	remove(id: number) {
		return `This action removes a #${id} movie`
	}
}
