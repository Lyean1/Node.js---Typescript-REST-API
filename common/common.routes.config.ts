import express from 'express';
export abstract class CommonRoutesConfig {
    app: express.Application;
    name: string;