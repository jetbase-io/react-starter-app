/* eslint-disable import/no-extraneous-dependencies */
import chalk from 'chalk'

const { log } = console

export const logInfo = (...text: string[]): void => {
  log(chalk.white.bgBlue(' INFO: '), chalk.blue(...text))
}

export const logWarn = (...text: string[]): void => {
  log(chalk.white.bgYellow(' WARNING: '), chalk.yellow(...text))
}

export const logError = (...text: string[]): void => {
  log(chalk.white.bgRed(' ERROR: '), chalk.red(...text))
}

export const logSuccess = (...text: string[]): void => {
  log(chalk.white.bgGreen(' SUCCESS: '), chalk.green(...text))
}
