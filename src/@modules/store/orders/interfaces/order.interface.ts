import { Document } from 'mongoose';

/**
 *  Declaring the Interface Order
 */
export interface IOrder extends Document {
	_id: string;
	title: string;
	content: string;
    created: Date;
    creator: string;
}