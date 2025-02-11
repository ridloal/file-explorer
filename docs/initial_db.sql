CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

/*
 Navicat Premium Dump SQL

 Source Server         : LOCAL POSTGRES
 Source Server Type    : PostgreSQL
 Source Server Version : 150008 (150008)
 Source Host           : localhost:5432
 Source Catalog        : explorer_db
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 150008 (150008)
 File Encoding         : 65001

 Date: 11/02/2025 11:07:05
*/


-- ----------------------------
-- Table structure for folders
-- ----------------------------
DROP TABLE IF EXISTS "public"."folders";
CREATE TABLE "public"."folders" (
  "id" int4 NOT NULL DEFAULT nextval('folders_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "parent_id" int4,
  "path" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of folders
-- ----------------------------
INSERT INTO "public"."folders" VALUES (1, 'Root', NULL, '/', '2025-02-10 22:52:30.3284', '2025-02-10 22:52:30.3284');
INSERT INTO "public"."folders" VALUES (2, 'Documents', 1, '/Documents', '2025-02-10 22:52:30.3284', '2025-02-10 22:52:30.3284');
INSERT INTO "public"."folders" VALUES (3, 'Pictures', 1, '/Pictures', '2025-02-10 22:52:30.3284', '2025-02-10 22:52:30.3284');
INSERT INTO "public"."folders" VALUES (4, 'Work', 2, '/Documents/Work', '2025-02-10 22:52:30.3284', '2025-02-10 22:52:30.3284');
INSERT INTO "public"."folders" VALUES (5, 'Personal', 2, '/Documents/Personal', '2025-02-10 22:52:30.3284', '2025-02-10 22:52:30.3284');
INSERT INTO "public"."folders" VALUES (6, 'Vacation', 3, '/Pictures/Vacation', '2025-02-10 22:52:30.3284', '2025-02-10 22:52:30.3284');
INSERT INTO "public"."folders" VALUES (7, 'Notes', 2, '/Documents/Notes', '2025-02-10 23:46:38.860021', '2025-02-10 23:46:38.860021');
INSERT INTO "public"."folders" VALUES (8, 'Videos', 2, '/Documents/Videos', '2025-02-10 23:46:58.076166', '2025-02-10 23:46:58.076166');
INSERT INTO "public"."folders" VALUES (9, 'Course Vue', 8, '/Documents/Videos/Course Vue', '2025-02-10 23:48:07.338896', '2025-02-10 23:48:07.338896');
INSERT INTO "public"."folders" VALUES (10, 'Course Bun Backend', 8, '/Documents/Videos/Course Bun Backend', '2025-02-10 23:48:48.586613', '2025-02-10 23:48:48.586613');
INSERT INTO "public"."folders" VALUES (11, 'Framework Elysia', 10, '/Documents/Video/Course Bun Backend/Framework Elysia', '2025-02-11 10:48:03.280341', '2025-02-11 10:48:03.280341');
INSERT INTO "public"."folders" VALUES (12, 'Projects', 1, '/Projects', '2025-02-11 11:03:25.357087', '2025-02-11 11:03:25.357087');
INSERT INTO "public"."folders" VALUES (13, 'APIs', 12, '/Projects/APIs', '2025-02-11 11:03:25.357087', '2025-02-11 11:03:25.357087');
INSERT INTO "public"."folders" VALUES (14, 'REST API', 13, '/Projects/APIs/REST API', '2025-02-11 11:03:25.357087', '2025-02-11 11:03:25.357087');
INSERT INTO "public"."folders" VALUES (15, 'GraphQL API', 13, '/Projects/APIs/GraphQL API', '2025-02-11 11:03:25.357087', '2025-02-11 11:03:25.357087');
INSERT INTO "public"."folders" VALUES (16, 'Databases', 1, '/Databases', '2025-02-11 11:03:25.357087', '2025-02-11 11:03:25.357087');
INSERT INTO "public"."folders" VALUES (17, 'PostgreSQL', 16, '/Databases/PostgreSQL', '2025-02-11 11:03:25.357087', '2025-02-11 11:03:25.357087');
INSERT INTO "public"."folders" VALUES (18, 'MongoDB', 16, '/Databases/MongoDB', '2025-02-11 11:03:25.357087', '2025-02-11 11:03:25.357087');
INSERT INTO "public"."folders" VALUES (19, 'Frontend', 12, '/Projects/Frontend', '2025-02-11 11:03:25.357087', '2025-02-11 11:03:25.357087');
INSERT INTO "public"."folders" VALUES (20, 'ReactJS', 19, '/Projects/Frontend/ReactJS', '2025-02-11 11:03:25.357087', '2025-02-11 11:03:25.357087');
INSERT INTO "public"."folders" VALUES (21, 'VueJS', 19, '/Projects/Frontend/VueJS', '2025-02-11 11:03:25.357087', '2025-02-11 11:03:25.357087');

-- ----------------------------
-- Indexes structure for table folders
-- ----------------------------
CREATE INDEX "idx_folders_parent_id" ON "public"."folders" USING btree (
  "parent_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);
CREATE INDEX "idx_folders_path" ON "public"."folders" USING btree (
  "path" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table folders
-- ----------------------------
ALTER TABLE "public"."folders" ADD CONSTRAINT "folders_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table folders
-- ----------------------------
ALTER TABLE "public"."folders" ADD CONSTRAINT "folders_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."folders" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

---------------------------------------------------------------------------

/*
 Navicat Premium Dump SQL

 Source Server         : LOCAL POSTGRES
 Source Server Type    : PostgreSQL
 Source Server Version : 150008 (150008)
 Source Host           : localhost:5432
 Source Catalog        : explorer_db
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 150008 (150008)
 File Encoding         : 65001

 Date: 11/02/2025 11:06:46
*/


-- ----------------------------
-- Table structure for files
-- ----------------------------
DROP TABLE IF EXISTS "public"."files";
CREATE TABLE "public"."files" (
  "id" int4 NOT NULL DEFAULT nextval('files_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "folder_id" int4,
  "size" int8,
  "mime_type" varchar(100) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP
)
;

-- ----------------------------
-- Records of files
-- ----------------------------
INSERT INTO "public"."files" VALUES (1, 'ridlo.pdf', 2, 700000, NULL, '2025-02-10 23:41:13.071906', '2025-02-10 23:41:13.071906');
INSERT INTO "public"."files" VALUES (2, 'alimudin.pdf', 2, 4516000, NULL, '2025-02-10 23:41:32.365726', '2025-02-10 23:41:32.365726');
INSERT INTO "public"."files" VALUES (3, 'video1.mp4', 10, 30000025, NULL, '2025-02-11 00:45:01.077083', '2025-02-11 00:45:01.077083');
INSERT INTO "public"."files" VALUES (4, 'video2.mp4', 10, 50923922, NULL, '2025-02-11 00:45:23.140317', '2025-02-11 00:45:23.140317');
INSERT INTO "public"."files" VALUES (5, 'api_documentation.pdf', 14, 1200000, 'application/pdf', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (6, 'graphql_intro.pptx', 15, 2450000, 'application/vnd.openxmlformats-officedocument.presentationml.presentation', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (7, 'postgres_guide.docx', 17, 1800000, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (8, 'mongodb_cheatsheet.pdf', 18, 950000, 'application/pdf', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (9, 'react_tutorial.mp4', 20, 15000000, 'video/mp4', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (10, 'vue_components.js', 21, 45000, 'application/javascript', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (11, 'database_schema.sql', 17, 30000, 'application/sql', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (12, 'rest_api_example.py', 14, 25000, 'application/x-python-code', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (13, 'frontend_best_practices.md', 19, 15000, 'text/markdown', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (14, 'project_overview.pdf', 12, 1100000, 'application/pdf', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (15, 'microservices_architecture.pdf', 14, 1320000, 'application/pdf', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (16, 'graphql_advanced_guide.docx', 15, 2100000, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (17, 'postgres_performance_tuning.sql', 17, 75000, 'application/sql', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (18, 'mongodb_aggregation_framework.pdf', 18, 980000, 'application/pdf', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (19, 'react_hooks_guide.md', 20, 25000, 'text/markdown', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (20, 'vue_directives_guide.js', 21, 60000, 'application/javascript', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (21, 'docker_deployment_guide.pdf', 12, 1400000, 'application/pdf', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (22, 'kubernetes_basics.pptx', 12, 1900000, 'application/vnd.openxmlformats-officedocument.presentationml.presentation', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (23, 'api_testing_with_postman.pdf', 14, 1150000, 'application/pdf', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (24, 'graphql_resolvers_example.js', 15, 35000, 'application/javascript', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (25, 'nosql_vs_sql_comparison.docx', 16, 870000, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (26, 'mongodb_indexing_best_practices.md', 18, 28000, 'text/markdown', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (27, 'react_state_management.mp4', 20, 17500000, 'video/mp4', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (28, 'vue_cli_setup_guide.md', 21, 22000, 'text/markdown', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (29, 'database_backup_strategies.sql', 17, 54000, 'application/sql', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');
INSERT INTO "public"."files" VALUES (30, 'project_management_tips.pdf', 12, 1240000, 'application/pdf', '2025-02-11 11:03:37.130475', '2025-02-11 11:03:37.130475');

-- ----------------------------
-- Indexes structure for table files
-- ----------------------------
CREATE INDEX "idx_files_folder_id" ON "public"."files" USING btree (
  "folder_id" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table files
-- ----------------------------
ALTER TABLE "public"."files" ADD CONSTRAINT "files_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table files
-- ----------------------------
ALTER TABLE "public"."files" ADD CONSTRAINT "files_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "public"."folders" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
