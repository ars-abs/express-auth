import cookieParser from 'cookie-parser';
import express from 'express';

const setupRequestParsers = ({ app }) => {
	app.use(express.json());
	app.use(cookieParser());
};

export default setupRequestParsers;
