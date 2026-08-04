import mongoose from "mongoose";
import type { CartItem } from "../types/cart-item.types.ts";
declare const CartItem: mongoose.Model<CartItem, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, CartItem, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<CartItem & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<CartItem, mongoose.Model<CartItem, any, any, any, any, any, CartItem>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, CartItem, mongoose.Document<unknown, {}, CartItem, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<CartItem & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    quantity?: mongoose.SchemaDefinitionProperty<number, CartItem, mongoose.Document<unknown, {}, CartItem, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<CartItem & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    product?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, CartItem, mongoose.Document<unknown, {}, CartItem, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<CartItem & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
}, CartItem>, CartItem>;
export default CartItem;
//# sourceMappingURL=cart-item.model.d.ts.map