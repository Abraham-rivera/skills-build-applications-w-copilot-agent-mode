"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
exports.default = baseUrl;
