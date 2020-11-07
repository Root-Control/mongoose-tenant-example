import { Document } from 'mongoose';

/**
 *  Declaring the Base interface
 */
export interface Base extends Document {
	_id: string;
    createdAt: Date;
    updatedAt: Date;
}

