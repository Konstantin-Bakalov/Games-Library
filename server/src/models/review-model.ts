import { Model } from 'objection';
import { BaseModel } from './base-model';
import { DislikeModel } from './dislike-model';
import { LikeModel } from './like-model';
import { UserModel } from './user-model';

export class ReviewModel extends BaseModel {
    userId!: number;
    username!: string;
    gameId!: number;
    body!: string;
    user?: UserModel;
    like?: LikeModel;
    dislike?: DislikeModel;

    static get tableName() {
        return 'reviews';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: 'reviews.userId',
                    to: 'users.id',
                },
            },
            like: {
                relation: Model.BelongsToOneRelation,
                modelClass: LikeModel,
                join: {
                    from: 'reviews.id',
                    to: 'likes.reviewId',
                },
            },
            dislike: {
                relation: Model.BelongsToOneRelation,
                modelClass: DislikeModel,
                join: {
                    from: 'reviews.id',
                    to: 'dislikes.reviewId',
                },
            },
        };
    }
}
