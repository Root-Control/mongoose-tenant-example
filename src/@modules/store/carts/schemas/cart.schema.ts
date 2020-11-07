import { Document } from 'mongoose';
import { UserRolePermissions } from '@roles/user-role-permissions.enum';
import { ICrudServicePermissionRoles } from '@generics/crud/crud.interface';
import { Schema } from 'mongoose';

/**
 *  Cart Schema Declaration for Mongodb, declarated by mongoose schema
 */

export const CartSchema: Schema = new Schema({
    created: {
        type: Date,
        default: new Date()
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },    
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { autoCreate: true });

CartSchema.pre('save', function(next, params) {
    if (this.isNew) {
        //this['wasNew'] = this.isNew;
    }
    next();
});

CartSchema.post('save', async function(cart) {
    // if (this.wasNew) {
    //     console.log('Is Created');
    // } else {
    //     console.log('Is Updated');
    // }
});

CartSchema.methods.patch = async function(object: any) {
    const cart = Object.assign(this, object);
    return await cart.save();
};

export const CART_MODEL_TOKEN: string = 'Cart';

export const CartPermissions: ICrudServicePermissionRoles = {
    findAll: [
    	UserRolePermissions.ALL
    ],
    findById: [],
    findOne: [],
    create: [],
    findOneAndUpdate: [],
    findOneAndDelete: []
};

