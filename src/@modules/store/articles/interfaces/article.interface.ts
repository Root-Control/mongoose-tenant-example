import { Document } from 'mongoose';

/**
 *  Declaring the Interface Article
 */
export interface IArticle extends Document {
	_id: string;
	title: string;
	content: string;
    created: Date;
    creator: string;
}

