import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common'
import { MovieService } from './movie.service'
import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'

@Controller('movie')
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Post()
	create(@Body() createMovieDto: CreateMovieDto) {
		return this.movieService.create(createMovieDto)
	}

	@Get('star')
	star() {
		return this.movieService.searchStartWars()
	}

	@Get('fuzzy')
	fuzzy() {
		return this.movieService.searchFuzzy()
	}

	@Get('partial')
	partial() {
		return this.movieService.searchPartial()
	}

	@Get('wildcard')
	wildcard() {
		return this.movieService.searchWildcard()
	}

	@Get('auto')
	autocomplete() {
		return this.movieService.autocomplete()
	}

	@Get('aggs')
	aggs() {
		return this.movieService.aggs()
	}

	@Get('regex')
	regex() {
		return this.movieService.searchRegex()
	}



	@Get()
	findAll() {
		return this.movieService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.movieService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
		return this.movieService.update(+id, updateMovieDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.movieService.remove(+id)
	}
}
