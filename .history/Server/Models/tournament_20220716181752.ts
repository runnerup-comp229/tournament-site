import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TournamentSchema = new Schema
({
    Name : String,
    Owner : String,
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

const Model = mongoose.model("Contacts", TournamentSchema);

export default Model;