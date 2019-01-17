// Constants that are useful for game calculation
export const MIN_EXP = 50
export const MAX_LEVEL = 50

export function experienceToNextLevel(userLvl) {
    var expToNext = 0

    // we calculate the amount to experience to go to the next level
    expToNext = 25 * userLvl * (1 + userLvl)

    return expToNext
}