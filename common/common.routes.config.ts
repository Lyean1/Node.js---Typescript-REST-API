constructor(app: express.Application, name: string) {
    this.app = app;
    this.name = name;
    this.configureRoutes();