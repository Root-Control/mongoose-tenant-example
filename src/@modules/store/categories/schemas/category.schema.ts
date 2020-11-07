import { Document } from 'mongoose';
import { UserRolePermissions } from '@roles/user-role-permissions.enum';
import { ICrudServicePermissionRoles } from '@generics/crud/crud.interface';
import { Schema } from 'mongoose';

/**
 *  Category Schema Declaration for Mongodb, declarated by mongoose schema
 */

export const CategorySchema: Schema = new Schema({
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

CategorySchema.pre('save', function(next, params) {
    if (this.isNew) {
        //this['wasNew'] = this.isNew;
    }
    next();
});

CategorySchema.post('save', async function(category) {
    // if (this.wasNew) {
    //     console.log('Is Created');
    // } else {
    //     console.log('Is Updated');
    // }
});

CategorySchema.methods.patch = async function(object: any) {
    const category = Object.assign(this, object);
    return await category.save();
};

export const CATEGORY_MODEL_TOKEN: string = 'Category';

export const CategoryPermissions: ICrudServicePermissionRoles = {
    findAll: [
    	UserRolePermissions.ALL
    ],
    findById: [],
    findOne: [],
    create: [],
    findOneAndUpdate: [],
    findOneAndDelete: []
};

