import { Document } from 'mongoose';

/**
 *  Declaring the Interface Invoice
 */
export interface IInvoice extends Document {
	_id: string;
	title: string;
	content: string;
    created: Date;
    creator: string;
}

