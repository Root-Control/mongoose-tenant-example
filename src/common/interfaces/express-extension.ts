import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
//import { IUser } from '@modules/users/interfaces/user.interface';

export type Request = 
	ExpressRequest & { 
		//user: IUser, 
		model: any,
		tenant: string,
		connection: any,
		isGeneric: boolean,
		genericPermissions: any,
		user: any
	}


export type Response = ExpressResponse;
