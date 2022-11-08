import { ReviewModel } from '../models/review-model';
import { ReviewModel as RWM } from 'shared';

class ReviewService {
    async create(review: RWM) {
        return await ReviewModel.query().insertAndFetch(review);
    }

    async list(gameId: number) {
        return await ReviewModel.query().where({ gameId });
    }
}

export const reviewService = new ReviewService();
