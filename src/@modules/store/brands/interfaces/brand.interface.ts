import { Document } from 'mongoose';

/**
 *  Declaring the Interface Brand
 */
export interface IBrand extends Document {
	_id: string;
	name: string;
	description: string;
}

