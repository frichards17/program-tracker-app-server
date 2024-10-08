"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CommandLoading } from "cmdk"

export interface ComboboxItem<T extends React.Key> {
    value: React.Key,
    label: string
}

const Combobox = <T extends React.Key,>({
    items,
    loading,
    onChange,
    placeholder = "",
    searchPlaceholder = "Search...",
    notFoundMessage = "Item not found",
}: {
    items: ComboboxItem<T>[],
    loading: boolean,
    onChange: (value: T | undefined) => void,
    placeholder?: string,
    searchPlaceholder?: string,
    notFoundMessage?: string,
}) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className=" justify-between"
                >
                    {value
                        ? items.find((item) => item.label === value)?.label
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0">
                <Command>
                    <CommandInput placeholder={searchPlaceholder} />
                    <CommandList>
                        <CommandEmpty>
                            {notFoundMessage}
                        </CommandEmpty>
                        {loading && <CommandLoading>Loading...</CommandLoading>}
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.label}
                                    onSelect={(currentValue) => {
                                        const deselect = currentValue === value
                                        setValue( deselect ? "" : currentValue)
                                        setOpen(false)
                                        onChange(deselect ? undefined : item.value as T)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === item.label ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default Combobox
