import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { NAME } from '@/constants/program'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import AddExercise from './add-exercise'
import { useQueryClient } from '@tanstack/react-query'

const FormSchema = z.object({
    [NAME]: z.string({
        required_error: "A name is required"
    }),
})

const CreateSession = () => {

    const queryClient = useQueryClient()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
    
        
        queryClient.invalidateQueries({queryKey: ['program-info']})
    }

    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-3xl font-bold">Create Session</CardTitle>
                <Separator />
            </CardHeader>
            <CardContent className="min-h-80 flex flex-col space-y-4">
                <span className='text-lg font-medium'>Session Details</span>
                {/* <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[500px]">
                        <FormField
                            control={form.control}
                            name={NAME}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Program Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="New Program"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        A unique descriptive name for the program
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form> */}
                <span className='text-lg font-medium'>Add Exercise</span>
            </CardContent>
        </Card>
    )
}

export default CreateSession