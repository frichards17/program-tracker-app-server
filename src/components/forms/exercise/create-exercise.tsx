"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { NAME } from '@/constants/exercise'
import { createExercise } from '@/lib/external-api/backend-services/exercise.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'

import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
    [NAME]: z.string({
        required_error: "Enter the exercise's name"
    })
})

const CreateExercise = () => {

    const queryClient = useQueryClient()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            [NAME]: "",
        }
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const response = await fetch('/api/exercises',{
            method: 'POST',
            body: JSON.stringify({
                exercise_name: data[NAME]
            })
        })

        const json = await response.json()
        form.reset()
        queryClient.invalidateQueries({ queryKey: ['exercises']})
    }

  return (
    <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-3xl font-bold">Create Exercise</CardTitle>
                <Separator />
            </CardHeader>
            <CardContent className="min-h-80 flex flex-col space-y-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-[500px]">
                        <FormField
                            control={form.control}
                            name={NAME}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Exercise Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="New Exercise"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">
                            Create
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
  )
}

export default CreateExercise