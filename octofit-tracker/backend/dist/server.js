"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./config/database");
const routes_1 = __importDefault(require("./routes"));
const baseUrl_1 = __importDefault(require("./config/baseUrl"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'OctoFit Tracker API is running' });
});
// Expose codespaces-aware base URL for clients
app.get('/api/config', (_req, res) => {
    res.json({ apiBase: `${baseUrl_1.default}/api` });
});
// Mount API routes under /api
app.use('/api', routes_1.default);
app.listen(port, '0.0.0.0', () => {
    console.log(`Backend listening on port ${port}`);
    if (process.env.CODESPACE_NAME) {
        console.log(`Codespaces URL: https://${process.env.CODESPACE_NAME}-8000.app.github.dev`);
    }
    console.log(`Local URL: http://localhost:${port}`);
});
