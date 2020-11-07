import { Document } from 'mongoose';
import { UserRolePermissions } from '@roles/user-role-permissions.enum';
import { ICrudServicePermissionRoles } from '@generics/crud/crud.interface';
import { Schema } from 'mongoose';

/**
 *  Article Schema Declaration for Mongodb, declarated by mongoose schema
 */

export const ArticleSchema: Schema = new Schema({
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

ArticleSchema.pre('save', function(next, params) {
    if (this.isNew) {
        //this['wasNew'] = this.isNew;
    }
    next();
});

ArticleSchema.post('save', async function(article) {
    // if (this.wasNew) {
    //     console.log('Is Created');
    // } else {
    //     console.log('Is Updated');
    // }
});

ArticleSchema.methods.patch = async function(object: any) {
    const article = Object.assign(this, object);
    return await article.save();
};

export const ARTICLE_MODEL_TOKEN: string = 'Article';

export const ArticlePermissions: ICrudServicePermissionRoles = {
    findAll: [
    	UserRolePermissions.ALL
    ],
    findById: [],
    findOne: [],
    create: [],
    findOneAndUpdate: [],
    findOneAndDelete: []
};

