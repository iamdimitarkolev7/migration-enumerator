import { MIGRATIONS_FOLDER } from './constants'
import {
  getAllMigrations,
  renameMigrations,
  sortAllMigrations,
} from './migration-service'

const enumerateMigrations = () => {
  const migrations = getAllMigrations(MIGRATIONS_FOLDER)
  const sortedMigrations = sortAllMigrations(MIGRATIONS_FOLDER, migrations)

  renameMigrations(MIGRATIONS_FOLDER, sortedMigrations)
}

enumerateMigrations()