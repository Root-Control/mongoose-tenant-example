import { Document } from 'mongoose';
import { UserRolePermissions } from '@roles/user-role-permissions.enum';
import { ICrudServicePermissionRoles } from '@generics/crud/crud.interface';
import { Schema } from 'mongoose';

/**
 *  Order Schema Declaration for Mongodb, declarated by mongoose schema
 */

export const OrderSchema: Schema = new Schema({
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

OrderSchema.pre('save', function(next, params) {
    if (this.isNew) {
        //this['wasNew'] = this.isNew;
    }
    next();
});

OrderSchema.post('save', async function(order) {
    // if (this.wasNew) {
    //     console.log('Is Created');
    // } else {
    //     console.log('Is Updated');
    // }
});

OrderSchema.methods.patch = async function(object: any) {
    const order = Object.assign(this, object);
    return await order.save();
};

export const ORDER_MODEL_TOKEN: string = 'Order';

export const OrderPermissions: ICrudServicePermissionRoles = {
    findAll: [
    	UserRolePermissions.ALL
    ],
    findById: [],
    findOne: [],
    create: [],
    findOneAndUpdate: [],
    findOneAndDelete: []
};

