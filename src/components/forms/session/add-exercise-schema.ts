import { EXERCISE_ID, REPS, SETS, WEIGHT } from "@/constants/exercise"
import { z } from "zod"

const AddExerciseSchema = z.object({
    [EXERCISE_ID]: z.union([
        z.coerce
          .number({
            message: "No exercise selected",
          })
          .positive({
            message: "No exercise selected",
          }),
        z.literal("").refine(() => false, {
          message: "No exercise selected",
        }),
      ]),
    [WEIGHT]: z.union([
        z.coerce
          .number({
            message: "Specify a weight for the exercise",
          })
          .positive({
            message: "Specify a weight for the exercise",
          }),
        z.literal("").refine(() => false, {
          message: "Specify a weight for the exercise",
        }),
      ]),
    [SETS]: z.union([
        z.coerce
          .number({
            message: "Specify a number of sets",
          })
          .int({
            message: "Specify a number of sets"
          })
          .positive({
            message: "Specify a number of sets",
          }),
        z.literal("").refine(() => false, {
          message: "Specify a number of sets",
        }),
      ]),
    [REPS]: z.union([
        z.coerce
          .number({
            message: "Specify a number of reps",
          })
          .int({
            message: "Specify a number of reps"
          })
          .positive({
            message: "Specify a number of reps",
          }),
        z.literal("").refine(() => false, {
          message: "Specify a number of reps",
        }),
      ]),

})

export default AddExerciseSchema