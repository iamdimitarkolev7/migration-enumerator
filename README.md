# migration-enumerator

A simple CLI tool to automatically reorder your migration files based on the **timestamp** inside the class name.

## What it does

* Scans your migration templates (in `packages/common/src/db-migrations/templates`).
* Sorts migration files based on the **timestamp number** at the end of the **class name** inside each file.
* Renames files to have correct numeric prefixes (`1-`, `2-`, etc.)  **based on their actual timestamps**.
* **Skips** renaming if the file prefix is already correct.
* Ensures a clean, correctly ordered migrations list —  **automatically**.

## Installation

> **npm install -g migration-enumerator**

## Usage

In your monorepo just execute **`migration-enumerator`** in the terminal

## Example

Suppose you have:

```
2-add-column1-to-table-a.ts // contains class AddColumn1ToTableA1682601234
3-add-column2-to-table-b.ts // contains class AddColumn2ToTableB1682601000
```

Notice: `1682601000` < `1682601234`, so the second file should come **before** the first.

After running `migration-enumerator` the result will be:

```
2-add-column2-to-table-b.ts
3-add-column1-to-table-a.ts
```

Correct order based on class timestamps.
