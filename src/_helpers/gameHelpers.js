export function experienceToNextLevel(userLvl) {
    var expToNext = 0

    // we calculate the amount to experience to go to the next level
    expToNext = 25 * userLvl * (1 + userLvl)

    return expToNext
}