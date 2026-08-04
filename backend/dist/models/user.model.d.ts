import mongoose from "mongoose";
import type { IUser } from "../types/user-modle.types.ts";
import type { CartItem } from "../types/cart-item.types.ts";
import { UserRole } from "../enums/user-role.enum.ts";
declare const User: mongoose.Model<IUser, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, IUser, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & import("../types/user-modle.types.ts").IUserBase & import("../types/user-modle.types.ts").IUserMethods & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<IUser, mongoose.Model<IUser, any, any, any, any, any, IUser>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IUser, mongoose.Document<unknown, {}, IUser, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & import("../types/user-modle.types.ts").IUserBase & import("../types/user-modle.types.ts").IUserMethods & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    _id?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & import("../types/user-modle.types.ts").IUserBase & import("../types/user-modle.types.ts").IUserMethods & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    name?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & import("../types/user-modle.types.ts").IUserBase & import("../types/user-modle.types.ts").IUserMethods & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    email?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & import("../types/user-modle.types.ts").IUserBase & import("../types/user-modle.types.ts").IUserMethods & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    password?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & import("../types/user-modle.types.ts").IUserBase & import("../types/user-modle.types.ts").IUserMethods & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    cartItems?: mongoose.SchemaDefinitionProperty<CartItem[], IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & import("../types/user-modle.types.ts").IUserBase & import("../types/user-modle.types.ts").IUserMethods & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    role?: mongoose.SchemaDefinitionProperty<UserRole, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & import("../types/user-modle.types.ts").IUserBase & import("../types/user-modle.types.ts").IUserMethods & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    comparePassword?: mongoose.SchemaDefinitionProperty<(password: string) => Promise<boolean>, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<mongoose.Document<mongoose.Types.ObjectId, any, any, Record<string, any>, {}> & import("../types/user-modle.types.ts").IUserBase & import("../types/user-modle.types.ts").IUserMethods & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
}, IUser>, IUser>;
export default User;
//# sourceMappingURL=user.model.d.ts.map