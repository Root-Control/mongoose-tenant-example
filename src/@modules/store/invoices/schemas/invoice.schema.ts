import { Document } from 'mongoose';
import { UserRolePermissions } from '@roles/user-role-permissions.enum';
import { ICrudServicePermissionRoles } from '@generics/crud/crud.interface';
import { Schema } from 'mongoose';

/**
 *  Invoice Schema Declaration for Mongodb, declarated by mongoose schema
 */

export const InvoiceSchema: Schema = new Schema({
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

InvoiceSchema.pre('save', function(next, params) {
    if (this.isNew) {
        //this['wasNew'] = this.isNew;
    }
    next();
});

InvoiceSchema.post('save', async function(invoice) {
    // if (this.wasNew) {
    //     console.log('Is Created');
    // } else {
    //     console.log('Is Updated');
    // }
});

InvoiceSchema.methods.patch = async function(object: any) {
    const invoice = Object.assign(this, object);
    return await invoice.save();
};

export const INVOICE_MODEL_TOKEN: string = 'Invoice';

export const InvoicePermissions: ICrudServicePermissionRoles = {
    findAll: [
    	UserRolePermissions.ALL
    ],
    findById: [],
    findOne: [],
    create: [],
    findOneAndUpdate: [],
    findOneAndDelete: []
};

