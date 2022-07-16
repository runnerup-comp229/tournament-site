"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const TournamentSchema = new Schema({
    Name: String,
    Owner: String,
    isActive: Boolean,
    Participants: {
        Team1: String,
        Team2: String,
        Team3: String,
        Team4: String,
        Team5: String,
        Team6: String,
        Team7: String,
        Team8: String
    },
    SemiFinal: {
        Team1: String,
        Team2: String,
        Team3: String,
        Team4: String
    },
    RunnerUp: {
        Team1: String,
        Team2: String
    },
    Final: {
        Team1: String,
        Team2: String
    },
    First: String,
    Second: String,
    Third: String,
    Fourth: String
}, {
    collection: "tournaments"
});
const Model = mongoose_1.default.model("Contacts", TournamentSchema);
exports.default = Model;
//# sourceMappingURL=tournament.js.map