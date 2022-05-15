import { OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
export declare class MovieModule implements OnModuleInit {
    private elasticSearch;
    private index;
    constructor(elasticSearch: ElasticsearchService, index: string);
    onModuleInit(): Promise<void>;
}
