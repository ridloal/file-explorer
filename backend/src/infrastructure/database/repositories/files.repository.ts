import { eq } from 'drizzle-orm';
import { db } from '../connection';
import { files } from '../schema';
import { File } from '../../../core/domain/entities/folder.entity';

export class DrizzleFileRepository {
  async findByFolderId(folderId: number): Promise<File[]> {
    const dbFiles = await db
      .select()
      .from(files)
      .where(eq(files.folderId, folderId));

    return dbFiles.map(dbFile => ({
      id: dbFile.id,
      name: dbFile.name,
      folderId: dbFile.folderId ?? 0,
      size: dbFile.size ?? 0,
      mimeType: dbFile.mimeType ?? '',
      createdAt: dbFile.createdAt ?? new Date(),
      updatedAt: dbFile.updatedAt ?? new Date()
    }));
  }
}