// import Mongoose
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create tournament schema
const TournamentSchema = new Schema
({
    Name : String,
    Owner : {
        Id : String,
        DisplayName : String
    },
    isActive : Boolean,
    Participants : [String],
    SemiFinal: [String],
    RunnerUp: [String],
    Final: [String],
    First : String,
    Second : String,
    Third: String,
    Fourth : String
},
{
    collection: "tournaments"
});

// create a model using the schema
const Model = mongoose.model("Contacts", TournamentSchema);

// export the model to make the file a module
export default Model;