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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const elasticsearch_1 = require("@nestjs/elasticsearch");
let CommentService = class CommentService {
    constructor(elasticSearch) {
        this.elasticSearch = elasticSearch;
    }
    async create(createCommentDto) {
        const response = await this.elasticSearch.index({
            index: 'comment',
            document: {
                content: createCommentDto.content,
            },
        });
        console.log('response :>> ', response);
        return 'This action adds a new comment';
    }
    async findAll() {
        return this.elasticSearch.search();
    }
    async search(keyword) {
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
        });
    }
    findOne(id) {
        return `This action returns a #${id} comment`;
    }
    update(id, updateCommentDto) {
        return `This action updates a #${id} comment`;
    }
    remove(id) {
        return `This action removes a #${id} comment`;
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [elasticsearch_1.ElasticsearchService])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map