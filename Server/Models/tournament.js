"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const TournamentSchema = new Schema({
    TournamentName: String,
    FirstRound: [String],
    SecondRound: [String],
    SemiFinal: [String],
    RunnerUp: [String],
    Final: [String]
}, {
    collection: "tournaments"
});
const Model = mongoose_1.default.model("Contacts", TournamentSchema);
exports.default = Model;
//# sourceMappingURL=tournament.js.map