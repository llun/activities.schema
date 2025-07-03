# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript library that provides Zod schemas for validating ActivityPub and Mastodon data. It exports validation schemas for social media activities and objects like notes, actors, follows, likes, and various Mastodon-specific entities.

## Commands

### Build
```bash
npm run build
```
Builds the project in three module formats:
- CommonJS to `dist/cjs/`
- ES Modules to `dist/esm/`
- TypeScript declarations to `dist/types/`

### Release
```bash
npm run release
```
Cleans dist directory, builds, and publishes to npm with public access.

## Architecture

### Core Structure
- **Root exports** (`src/index.ts`): ActivityPub entities (Actor, Note, Follow, Like, etc.)
- **Mastodon namespace** (`src/mastodon/`): Mastodon-specific schemas exported as `Mastodon.*`
- **Nested schemas**: Complex types like Note use composition with shared base schemas

### Key Patterns
- All schemas use Zod for validation and TypeScript type generation
- Exports follow the pattern: `export const Schema = z.object(...)` and `export type Schema = z.infer<typeof Schema>`
- ActivityPub entities extend base content schemas for common properties
- Mastodon schemas are organized by entity type (account, status, media, etc.)

### Module System
- Uses ES modules (`"type": "module"` in package.json)
- Import paths use `.js` extensions for compatibility
- Triple build output supports both CommonJS and ES module consumers

## Key Dependencies
- **zod**: Core validation library - all schemas are built with Zod
- **typescript**: Development dependency for type checking and compilation