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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModule = void 0;
const common_1 = require("@nestjs/common");
const comment_service_1 = require("./comment.service");
const comment_controller_1 = require("./comment.controller");
const elasticsearch_1 = require("@nestjs/elasticsearch");
let CommentModule = class CommentModule {
    constructor(elasticSearch) {
        this.elasticSearch = elasticSearch;
    }
    async onModuleInit() {
        const index = 'comment';
        try {
            const response = await this.elasticSearch.indices.exists({ index });
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
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
};
CommentModule = __decorate([
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
        controllers: [comment_controller_1.CommentController],
        providers: [comment_service_1.CommentService],
    }),
    __metadata("design:paramtypes", [elasticsearch_1.ElasticsearchService])
], CommentModule);
exports.CommentModule = CommentModule;
//# sourceMappingURL=comment.module.js.map