import { Document } from 'mongoose';

/**
 *  Declaring the Interface Cart
 */
export interface ICart extends Document {
	_id: string;
	title: string;
	content: string;
    created: Date;
    creator: string;
}

