import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { DrizzleFolderRepository } from './infrastructure/database/repositories/folder.repository';
import { FolderUseCase } from './core/usecases/folder.usecase';
import { FolderController } from './interfaces/controllers/folder.controller';
import { setupFolderRoutes } from './interfaces/routes/folder.routes';

const app = new Elysia();

// Setup middlewares
app.use(cors());

// Setup dependencies
const folderRepository = new DrizzleFolderRepository();
const folderUseCase = new FolderUseCase(folderRepository);
const folderController = new FolderController(folderUseCase);

// Setup routes
setupFolderRoutes(app, folderController);

// Start server
app.listen(3000);

console.log(`🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`);