export interface AddSessionExerciseRequest {
    session_id: number
    exercise_id: number
    weight: number
    sets: number
    reps: number
}