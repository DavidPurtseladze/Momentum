import React from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

export default function Select(props) {
    return (
        <Listbox value={props.state} onChange={props.setState}>
            <div className="w-full relative">
                <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 sm:text-sm/6">
                  <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                    <span className="block truncate">{props.state.name}</span>
                  </span>
                </ListboxButton>
                <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                >
                    {props.departamentData.map((item) => (
                        <ListboxOption
                            key={item.id}
                            value={item}
                            className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:outline-hidden"
                        >
                            <div className="flex items-center">
                                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{item.name}</span>
                            </div>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}