"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieService = void 0;
const common_1 = require("@nestjs/common");
const elasticsearch_1 = require("@nestjs/elasticsearch");
let MovieService = class MovieService {
    constructor(elasticSearch, index) {
        this.elasticSearch = elasticSearch;
        this.index = index;
    }
    create(createMovieDto) {
        return 'This action adds a new movie';
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
        });
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
        });
    }
    async searchPartial() {
        return this.elasticSearch.search({
            index: this.index,
            query: {
                prefix: {
                    title: 'wa',
                },
            },
        });
    }
    async searchWildcard() {
        return this.elasticSearch.search({
            index: this.index,
            query: {
                wildcard: {
                    title: '20*',
                },
            },
        });
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
        });
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
        });
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
        });
    }
    findAll() {
        return `This action returns all movie`;
    }
    findOne(id) {
        return `This action returns a #${id} movie`;
    }
    update(id, updateMovieDto) {
        return `This action updates a #${id} movie`;
    }
    remove(id) {
        return `This action removes a #${id} movie`;
    }
};
MovieService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('index')),
    __metadata("design:paramtypes", [elasticsearch_1.ElasticsearchService, String])
], MovieService);
exports.MovieService = MovieService;
//# sourceMappingURL=movie.service.js.map