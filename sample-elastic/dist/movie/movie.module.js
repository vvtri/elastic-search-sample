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
exports.MovieModule = void 0;
const common_1 = require("@nestjs/common");
const movie_service_1 = require("./movie.service");
const movie_controller_1 = require("./movie.controller");
const elasticsearch_1 = require("@nestjs/elasticsearch");
let MovieModule = class MovieModule {
    constructor(elasticSearch, index) {
        this.elasticSearch = elasticSearch;
        this.index = index;
    }
    async onModuleInit() {
        const isExistIndex = await this.elasticSearch.indices.exists({
            index: this.index,
        });
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
            });
        }
        const autocompleteIdx = await this.elasticSearch.indices.exists({
            index: 'autocomplete',
        });
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
            });
        }
    }
};
MovieModule = __decorate([
    (0, common_1.Module)({
        imports: [
            elasticsearch_1.ElasticsearchModule.register({
                node: 'http://localhost:9200',
                auth: {
                    username: 'elastic',
                    password: 'elastic',
                },
            }),
        ],
        controllers: [movie_controller_1.MovieController],
        providers: [
            movie_service_1.MovieService,
            {
                provide: 'index',
                useValue: 'movies',
            },
        ],
    }),
    __param(1, (0, common_1.Inject)('index')),
    __metadata("design:paramtypes", [elasticsearch_1.ElasticsearchService, String])
], MovieModule);
exports.MovieModule = MovieModule;
//# sourceMappingURL=movie.module.js.map