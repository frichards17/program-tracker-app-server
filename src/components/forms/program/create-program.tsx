"use client"

import React from 'react'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { NAME, START_DATE } from '@/constants/program'
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn, formatDate } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const FormSchema = z.object({
    [NAME]: z.string({
        required_error: "A name is required"
    }),
    [START_DATE]: z.date({
        required_error: "A start date is required.",
    }),
})

const CreateProgram = () => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = (data: z.infer<typeof FormSchema>) => {

    }

    return (
        <div className='space-y-4'>
            <h2 className='text-xl font-semibold'>Create Program</h2>
            <div>
                <Form {...form}>
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
                        <FormField
                            control={form.control}
                            name={START_DATE}
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Start Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        formatDate(field.value)
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    // date < getMonday(new Date())
                                                    date < getMonday()
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        New programs can only be created for this week or later
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='w-full'>Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default CreateProgram

function getMonday() {
    const newDate = new Date();
    const dayOfWeek = newDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    
    // Calculate the difference in days from Monday (Monday is day 1, Sunday is day 0)
    const daysSinceMonday = (dayOfWeek + 6) % 7;

    // Subtract the difference from today's date to get the most recent Monday
    newDate.setDate(newDate.getDate() - daysSinceMonday);

    // Set time to 00:00
    newDate.setHours(0, 0, 0, 0)

    // Return the date of the most recent Monday
    return newDate;
}
