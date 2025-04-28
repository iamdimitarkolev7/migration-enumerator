import { join } from 'path'

/* Regex */ 
export const MIGRATION_FILE_NAME_REGEX = /^\d+-.*\.ts$/
export const CLASS_NAME_REGEX = /export\s+class\s+(\w+)/
export const TIMESTAMP_MATCH = /(\d+)$/

/* Target path */
export const MIGRATIONS_FOLDER = join(process.cwd(), 'packages/common/src/db-migrations/templates')