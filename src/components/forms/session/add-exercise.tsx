import { Button } from '@/components/ui/button'
import Combobox, { ComboboxItem } from '@/components/ui/combobox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import NumberInput from '@/components/ui/number-input'
import { EXERCISE_ID, REPS, SETS, WEIGHT } from '@/constants/exercise'
import { Exercise } from '@/lib/external-api/backend-services/exercise.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import AddExerciseSchema from './add-exercise-schema'

export interface AddExerciseDto {
    session_id: number
    exercise_id: number
    weight: number
    sets: number
    reps: number
}

const AddExercise = ({
    addExercise,
    forSession
}: {
    addExercise: (exercise: AddExerciseDto) => void,
    forSession: number
}) => {

    const getExercises = async (): Promise<Exercise[]> => {
        const response = await fetch(`/api/exercises`)
        return await response.json()
    }

    const {
        isPending,
        isError,
        data,
        error
    } = useQuery({
        queryKey: ['exercises'],
        queryFn: getExercises,
    })

    var exercises: ComboboxItem<number>[] = []
    if (data) {
        exercises = data.map((exercise) => {
            return {
                value: exercise.exercise_id,
                label: exercise.exercise_name
            }
        })
    }

    const form = useForm<z.infer<typeof AddExerciseSchema>>({
        resolver: zodResolver(AddExerciseSchema),
        defaultValues: {
            [EXERCISE_ID]: "",
            [WEIGHT]: "",
            [SETS]: "",
            [REPS]: ""
        }
    })

    const onSubmit = (data: z.infer<typeof AddExerciseSchema>) => {
        addExercise({
            session_id: forSession,
            exercise_id: +data[EXERCISE_ID],
            weight: +data[WEIGHT],
            sets: +data[SETS],
            reps: +data[REPS]
        })
    }

    return (
        <Form {...form}>
            <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">

                <div className="grid grid-cols-3 gap-x-2 gap-y-4">

                    {/* EXERCISE */}
                    <FormField
                        control={form.control}
                        name={EXERCISE_ID}
                        render={({ field }) => (
                            <FormItem className='col-span-3 flex flex-col space-y-2'>
                                <FormLabel>Exercise</FormLabel>
                                <FormControl>
                                    <Combobox
                                        loading={isPending}
                                        items={exercises}
                                        onChange={(value) => {
                                            console.log("Exercise selected:", value)
                                            if (value) {
                                                form.setValue(EXERCISE_ID, value)
                                            } else {
                                                form.resetField(EXERCISE_ID)
                                            }
                                        }}
                                        placeholder="Select an exercise"
                                        notFoundMessage="Exercise not found."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* WEIGHT */}
                    <FormField
                        control={form.control}
                        name={WEIGHT}
                        render={({ field }) => (
                            <FormItem className='flex flex-col space-y-2'>
                                <FormLabel>{"Weight (kg)"}</FormLabel>
                                <FormControl>
                                    <NumberInput
                                        placeholder="0"
                                        step={0.25}
                                        {...field}
                                        onChange={(event)=>{                                    
                                            field.onChange(event.target.value)
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* SETS */}
                    <FormField
                        control={form.control}
                        name={SETS}
                        render={({ field }) => (
                            <FormItem className='flex flex-col space-y-2'>
                                <FormLabel>Sets</FormLabel>
                                <FormControl>
                                    <NumberInput
                                        isInt={true}
                                        placeholder="0"
                                        {...field}
                                        onChange={(event) => {
                                            field.onChange(event.target.value)
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* REPS */}
                    <FormField
                        control={form.control}
                        name={REPS}
                        render={({ field }) => (
                            <FormItem className='flex flex-col space-y-2'>
                                <FormLabel>Reps</FormLabel>
                                <FormControl>
                                    <NumberInput
                                        isInt={true}
                                        placeholder="0"
                                        {...field}
                                        onChange={(event) => {
                                            field.onChange(event.target.value)
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className='w-full'>Add Exercise</Button>
            </form>
        </Form>
    )
}

export default AddExercise