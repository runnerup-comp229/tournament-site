import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TournamentSchema = new Schema
({
    Name : String,
    Owner : String,
    isActive : Boolean,
    Participants : 
    {
        Team1 : String,
        Team2 : String,
        Team3 : String,
        Team4 : String,
        Team5 : String,
        Team6 : String,
        Team7 : String,
        Team8 : String
    },
    SemiFinal: {
        Team1 : String,
        Team2 : String,
        Team3 : String,
        Team4 : String
    },
    RunnerUp: {
        Team1 : String,
        Team2 : String
    },
    Final: {
        Team1 : String,
        Team2 : String
    },
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