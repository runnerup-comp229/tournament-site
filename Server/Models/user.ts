import mongoose, { PassportLocalSchema } from 'mongoose';
const Schema = mongoose.Schema; //mongoose.Schema alias is created 
import passportLocalMongoose from 'passport-local-mongoose';

//  Created a Schema 
const UserSchema = new Schema
({
    DisplayName: String,
    username: String,
    EmailAddress: String,
    Created:
    {
        type: Date,
        default: Date.now()
    },
    Updated:
    {
        type: Date,
        default: Date.now()
    }
},
{
    collection: "users"
});

declare global
{
    export type UserDocument = mongoose.Document &
    {
        username: String,
        EmailAddress: String,
        DisplayName: String
    }
}

// plugin  the passport local mongoose module
UserSchema.plugin(passportLocalMongoose)

//  Create a Model using the Schema
const Model = mongoose.model("User", UserSchema as PassportLocalSchema);

//  Export the Model 
export default Model;