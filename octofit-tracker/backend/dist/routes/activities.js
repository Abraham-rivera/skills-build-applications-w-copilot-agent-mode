"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.json({ activities: [] });
});
router.post('/', (req, res) => {
    res.status(201).json({ message: 'activity logged', data: req.body });
});
exports.default = router;
