export const Roles = {
    ADMIN: "ADM",
    TRAINER: "TRA",
    USER: "USR"
}

const hasTrainerFeatures = [Roles.ADMIN, Roles.TRAINER]

export function hasClients(role: string): boolean {
    return hasTrainerFeatures.includes(role)
}

export function hasUsers(role: string): boolean {
    return role === Roles.ADMIN
}

export function hasExercises(role: string): boolean {
    return role === Roles.ADMIN
}

