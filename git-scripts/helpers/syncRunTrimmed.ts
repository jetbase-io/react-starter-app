import { execSync } from 'child_process'

export const syncRunTrimmed = (command: string): string => {
  return execSync(command).toString().trim()
}
