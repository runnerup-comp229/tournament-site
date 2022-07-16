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
    Participants: [String],
    SemiFinal: [String],
    RunnerUp: [String],
    Final: [String],
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