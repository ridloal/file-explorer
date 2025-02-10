import { Context } from 'elysia';
import { FolderUseCase } from '../../core/usecases/folder.usecase';

export class FolderController {
  constructor(private folderUseCase: FolderUseCase) {}

  async getFolderTree(context: Context) {
    try {
      const tree = await this.folderUseCase.getFolderTree();
      return {
        status: 'success',
        data: tree
      };
    } catch (error) {
      context.set.status = 500;
      return {
        status: 'error',
        message: 'Failed to fetch folder tree'
      };
    }
  }

  async getFolderChildren(context: Context) {
    try {
      const folderId = Number(context.params.id);
      const children = await this.folderUseCase.getFolderChildren(folderId);
      return {
        status: 'success',
        data: children
      };
    } catch (error) {
      context.set.status = 500;
      return {
        status: 'error',
        message: 'Failed to fetch folder children'
      };
    }
  }
}