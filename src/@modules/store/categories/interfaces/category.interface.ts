import { Document } from 'mongoose';

/**
 *  Declaring the Interface Category
 */
export interface ICategory extends Document {
	_id: string;
	title: string;
	content: string;
    created: Date;
    creator: string;
}

