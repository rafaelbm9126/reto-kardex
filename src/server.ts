import express from 'express';
import { ExpressApp } from './app/routers/routes';

const PORT = process.env.PORT || 8080;

const app = new ExpressApp(express());

app.listen(PORT);
