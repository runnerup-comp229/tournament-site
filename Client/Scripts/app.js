"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const animejs_1 = __importDefault(require("animejs"));
(function () {
    function Start() {
        $("a.delete").on("click", function (event) {
            if (!confirm("Are you sure?")) {
                event.preventDefault();
                location.href = "/home";
            }
            ;
        });
        $("a.deleteOnEdit").on("click", function (event) {
            if (!confirm("Are you sure?")) {
                let pathArray = window.location.pathname.split('/');
                event.preventDefault();
                location.href = "/edit/" + pathArray[pathArray.length - 1];
            }
            ;
        });
        $("a.teamT").on("click", function (event) {
            event.preventDefault();
            console.log("trigger");
            (0, animejs_1.default)({
                targets: "a.teamT",
                translateX: 125,
                duration: 1000,
                easing: 'quadInOut'
            });
        });
    }
    ;
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map