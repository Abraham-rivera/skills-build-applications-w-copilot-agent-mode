"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.json({ users: [] });
});
router.post('/', (req, res) => {
    // Placeholder - in later steps, persist using Mongoose models
    res.status(201).json({ message: 'user created', data: req.body });
});
exports.default = router;
