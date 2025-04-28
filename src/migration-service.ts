import { readdirSync, readFileSync, renameSync } from 'fs'
import { join } from 'path'
import { CLASS_NAME_REGEX, MIGRATION_FILE_NAME_REGEX, TIMESTAMP_MATCH } from './constants'
import { Migration } from './interface'

export const getAllMigrations = (folder: string): Migration[] => {
  const migrations = readdirSync(folder).filter(file => file.match(MIGRATION_FILE_NAME_REGEX))

  return migrations.map(migration => {
    const filePath = join(folder, migration)
    const content = readFileSync(filePath, 'utf-8')

    const classNameMatch = content.match(CLASS_NAME_REGEX)

    if (!classNameMatch) {
      throw new Error(`Cannot get class name of file: ${migration}`)
    }

    const className = classNameMatch[1]
    const timestampMatch = className.match(TIMESTAMP_MATCH)

    if (!timestampMatch) {
      throw new Error(`Cannot get timestamp from ${className} of file ${migration}`)
    }

    const timestamp = Number(timestampMatch[1])

    return { filename: migration, timestamp }
  })
}

export const sortAllMigrations = (MIGRATIONS_FOLDER: string, migrations: Migration[]): Migration[] => {
  return migrations.sort((a, b) => a.timestamp - b.timestamp)
}

export const renameMigrations = (folder: string, migrations: Migration[]) => {
  for (let i = 0; i < migrations.length; ++i) {
    const migration = migrations[i]
    const newPrefix = i + 1

    if (migrations[i].filename.startsWith(newPrefix.toString())) {
      continue
    }

    const oldFilepath = join(folder, migration.filename)
    const newFilename = `${newPrefix}-${migrations[i].filename.replace(/^\d+-/, '')}`

    const newFilepath = join(folder, newFilename)

    renameSync(oldFilepath, newFilepath)
  }
}
