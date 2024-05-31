import { exec } from 'child_process'

import { cleanConsoleLine } from './helpers/cleanConsoleLine'
import { loader } from './helpers/loader'
import { syncRunTrimmed } from './helpers/syncRunTrimmed'
import { logError, logSuccess } from './helpers/logs'

const BRANCH_NAME_PATTERN =
  /^(feature|fix)(\/.+)?|(development|production|staging)(\/.+)?$/gi

const { log } = console

const validateTypes = async (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const stagedFiles = syncRunTrimmed('git diff --cached --name-only')

    if (!stagedFiles) {
      reject(new Error(`❌ No files are staged in the Git index.`))
    }

    const spinnerInterval = loader('Running type checking')

    exec('npx tsc --noEmit', (error, stdout) => {
      clearInterval(spinnerInterval)
      cleanConsoleLine()

      if (error) {
        if (stdout) {
          log(stdout)
        }

        reject(new Error('❌ An error occurred during type validation'))
      } else {
        logSuccess(`✅ Type validation successful, no errors found`)
        resolve()
      }
    })
  })
}

const validateCodeStyle = async (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const spinnerInterval = loader('Checking code style')

    exec('npx lint-staged', (error, _stdout, stderr) => {
      clearInterval(spinnerInterval)
      cleanConsoleLine()

      if (error) {
        if (stderr) {
          log(stderr)
        }

        reject(new Error(`❌ Code style does not follows the guidelines`))
      } else {
        logSuccess(`✅ Code style follows the guidelines`)
        resolve()
      }
    })
  })
}

const validateBranchName = async (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const branchName = syncRunTrimmed('git rev-parse --abbrev-ref HEAD')

    if (BRANCH_NAME_PATTERN.test(branchName)) {
      logSuccess(`✅ Branch name follows the guidelines`)
      resolve()
    } else {
      reject(
        new Error(
          `❌ Branch name does not follows the guidelines (Pattern: [feature|fix|infra]/description or development | production | staging)`,
        ),
      )
    }
  })
}

const runPreCommitScripts = async (): Promise<void> => {
  try {
    await validateTypes()
    await validateCodeStyle()
    await validateBranchName()
  } catch (error) {
    if (error instanceof Error) {
      logError(error.message)
    }

    process.exit(1)
  }
}

runPreCommitScripts()
