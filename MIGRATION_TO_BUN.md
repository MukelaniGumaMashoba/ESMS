# Migration to Bun

This project has been migrated from npm/Node.js to Bun. Here's what changed and how to use it.

## What Changed

### Package Manager
- ✅ Now uses **Bun** instead of npm
- ✅ Added `packageManager` field to `package.json`
- ✅ Created `bunfig.toml` for Bun configuration
- ✅ Updated `.gitignore` to include `bun.lockb`

### Scripts
- All scripts now use `bun` or `bunx` instead of `npm`/`npx`
- `bunx` is used for running packages (equivalent to `npx`)
- Scripts remain compatible with Expo and other tools

### Documentation
- Updated `README.md` with Bun instructions
- Updated `SETUP.md` with Bun setup steps

## Quick Start

### Install Bun
```bash
curl -fsSL https://bun.sh/install | bash
```

Or on Windows:
```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

### Install Dependencies
```bash
bun install
```

### Run Commands
```bash
# Start development server
bun start

# Run with environment
bun run start:dev

# Run Convex
bunx convex dev
```

## Benefits of Bun

1. **Faster Installs** - Up to 30x faster than npm
2. **Built-in Tools** - Test runner, bundler, and package manager
3. **npm Compatible** - Works with all npm packages
4. **Better Performance** - Native speed JavaScript runtime

## Common Commands

| Old (npm) | New (Bun) |
|-----------|-----------|
| `npm install` | `bun install` |
| `npm run <script>` | `bun run <script>` |
| `npm start` | `bun start` |
| `npx <package>` | `bunx <package>` |
| `npm test` | `bun test` |

## Troubleshooting

### If you still have node_modules
```bash
# Remove old node_modules and lock files
rm -rf node_modules package-lock.json

# Install with Bun
bun install
```

### If scripts don't work
Make sure you're using `bun run` for scripts:
```bash
bun run start:dev
```

### Expo Compatibility
Bun is fully compatible with Expo. All Expo commands work the same:
```bash
bun run expo start
bun run expo run:android
bun run expo run:ios
```

## Notes

- Bun automatically creates `bun.lockb` (binary lockfile)
- The `bunfig.toml` file configures Bun's behavior
- All npm packages work with Bun - no changes needed
- TypeScript support is built-in

## Need Help?

- [Bun Documentation](https://bun.sh/docs)
- [Bun GitHub](https://github.com/oven-sh/bun)



