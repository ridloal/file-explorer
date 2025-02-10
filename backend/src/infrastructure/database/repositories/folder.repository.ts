import { eq } from 'drizzle-orm';
import { db } from '../connection';
import { folders } from '../schema';
import { Folder, FolderTree } from '../../../core/domain/entities/folder.entity';
import { FolderRepository } from '../../../core/repositories/folder.repository';

export class DrizzleFolderRepository implements FolderRepository {
  async findAll(): Promise<Folder[]> {
    const results = await db.select().from(folders);
    return results.map(result => ({
      id: result.id,
      name: result.name,
      parentId: result.parentId,
      path: result.path,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt
    }));
  }

  async findById(id: number): Promise<Folder | null> {
    const results = await db
      .select()
      .from(folders)
      .where(eq(folders.id, id))
      .limit(1);
    
    return results[0] || null;
  }

  async findChildren(parentId: number): Promise<Folder[]> {
    return await db
      .select()
      .from(folders)
      .where(eq(folders.parentId, parentId));
  }

  async getTree(): Promise<FolderTree[]> {
    const allFolders = await this.findAll();
    return this.buildTree(allFolders);
  }

  private buildTree(folders: Folder[], parentId: number | null = null): FolderTree[] {
    return folders
      .filter(folder => folder.parentId === parentId)
      .map(folder => ({
        ...folder,
        children: this.buildTree(folders, folder.id)
      }));
  }
}