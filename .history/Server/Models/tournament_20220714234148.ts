import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TournamentSchema = new Schema
({
    TournamentName : String,
    FirstRound: [String],
    SecondRound: [String],
    SemiFinal: [String],
    RunnerUp: [String],
    Final: [String]
},
{
    collection: "tournaments"
});

const Model = mongoose.model("Contacts", TournamentSchema);

export default Model;