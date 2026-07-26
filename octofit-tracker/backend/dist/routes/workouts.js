"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.json({ workouts: [] });
});
router.post('/', (req, res) => {
    res.status(201).json({ message: 'workout created', data: req.body });
});
exports.default = router;
