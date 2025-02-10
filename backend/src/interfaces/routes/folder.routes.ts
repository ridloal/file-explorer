import { Elysia } from 'elysia';
import { FolderController } from '../controllers/folder.controller';

export const setupFolderRoutes = (app: Elysia, folderController: FolderController) => {
    app.group('/api/v1/folders', app => app
        .get('/', context => folderController.getFolderTree(context))
        .get('/:id/content', context => folderController.getFolderContent(context))
    );
};
