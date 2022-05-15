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
exports.MovieController = void 0;
const common_1 = require("@nestjs/common");
const movie_service_1 = require("./movie.service");
const create_movie_dto_1 = require("./dto/create-movie.dto");
const update_movie_dto_1 = require("./dto/update-movie.dto");
let MovieController = class MovieController {
    constructor(movieService) {
        this.movieService = movieService;
    }
    create(createMovieDto) {
        return this.movieService.create(createMovieDto);
    }
    star() {
        return this.movieService.searchStartWars();
    }
    fuzzy() {
        return this.movieService.searchFuzzy();
    }
    partial() {
        return this.movieService.searchPartial();
    }
    wildcard() {
        return this.movieService.searchWildcard();
    }
    autocomplete() {
        return this.movieService.autocomplete();
    }
    aggs() {
        return this.movieService.aggs();
    }
    regex() {
        return this.movieService.searchRegex();
    }
    findAll() {
        return this.movieService.findAll();
    }
    findOne(id) {
        return this.movieService.findOne(+id);
    }
    update(id, updateMovieDto) {
        return this.movieService.update(+id, updateMovieDto);
    }
    remove(id) {
        return this.movieService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_movie_dto_1.CreateMovieDto]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('star'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "star", null);
__decorate([
    (0, common_1.Get)('fuzzy'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "fuzzy", null);
__decorate([
    (0, common_1.Get)('partial'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "partial", null);
__decorate([
    (0, common_1.Get)('wildcard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "wildcard", null);
__decorate([
    (0, common_1.Get)('auto'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "autocomplete", null);
__decorate([
    (0, common_1.Get)('aggs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "aggs", null);
__decorate([
    (0, common_1.Get)('regex'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "regex", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_movie_dto_1.UpdateMovieDto]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MovieController.prototype, "remove", null);
MovieController = __decorate([
    (0, common_1.Controller)('movie'),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieController);
exports.MovieController = MovieController;
//# sourceMappingURL=movie.controller.js.map