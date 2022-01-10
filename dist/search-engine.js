"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var homeRouter_1 = __importDefault(require("./routers/homeRouter"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var dotenv_1 = __importDefault(require("dotenv"));
var app = (0, express_1.default)();
dotenv_1.default.config();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
// Security
if (process.env.NODE_ENV === 'production') {
    app.use((0, helmet_1.default)());
}
// *********************************************
// ************ Setting up routes **************
// *********************************************
app.use('/api', homeRouter_1.default);
// 404 handler
app.use(function (req, res, next) {
    return res.sendStatus(http_status_codes_1.default.NOT_FOUND);
});
app.listen(3000, function () { return console.log('server is listenning on http://localhost:3000/'); });
