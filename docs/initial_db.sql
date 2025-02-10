CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create folders table
CREATE TABLE folders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id INTEGER REFERENCES folders(id),
    path TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create files table
CREATE TABLE files (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    folder_id INTEGER REFERENCES folders(id),
    size BIGINT,
    mime_type VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_folders_parent_id ON folders(parent_id);
CREATE INDEX idx_files_folder_id ON files(folder_id);
CREATE INDEX idx_folders_path ON folders(path);

-- Insert sample data
INSERT INTO folders (name, parent_id, path) VALUES
('Root', NULL, '/'),
('Documents', 1, '/Documents'),
('Pictures', 1, '/Pictures'),
('Work', 2, '/Documents/Work'),
('Personal', 2, '/Documents/Personal'),
('Vacation', 3, '/Pictures/Vacation');