# PowerShell script to automate migration, commit, and push for Veteralia backend

# Set environment variable for database connection
$env:DATABASE_URL="postgres://postgres:140290@localhost:5432/veteralia"

# 1. Remove and rebuild dist
Write-Output 'Cleaning build output...'
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue

# 2. Compile TypeScript
Write-Output 'Compiling TypeScript...'
npx tsc

# 3. Run TypeORM migration:generate with timestamp
Write-Output 'Generating migration...'
$timestamp = Get-Date -UFormat %s
$migrationName = "src/migrations/AutoMig_$timestamp"
npx typeorm migration:generate $migrationName -d typeorm.config.ts

# 4. Add, commit, and push changes
Write-Output 'Adding and committing changes...'
git add .
git commit -m "chore: auto migration and code changes [$timestamp]"
git push

Write-Output 'All done!'
