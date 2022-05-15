import { OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
export declare class CommentModule implements OnModuleInit {
    private elasticSearch;
    constructor(elasticSearch: ElasticsearchService);
    onModuleInit(): Promise<void>;
}
