import React from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

export default function Select(props) {
    return (
        <Listbox value={props.state} onChange={props.setState}>
            <div className="w-full relative">
                <ListboxButton className="grid h-11 w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 sm:text-sm/6">
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                        { props.state.icon !== undefined && <img src={props.state.icon} alt="Icon"/> }
                        { props.state.avatar !== undefined && <img className="w-7 h-7 object-cover rounded-full" src={props.state.avatar} alt="Icon"/> }
                        <span className="block truncate">{props.state.name} {props.state.surname !== undefined && props.state.surname}</span>
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
                                { item.icon !== undefined && <img src={item.icon} alt="Icon"/> }
                                { item.avatar !== undefined && <img className="w-7 h-7 object-cover rounded-full" src={item.avatar} alt="Icon"/> }
                                <span className="ml-3 block truncate text-sm font-normal group-data-selected:font-semibold">{item.name} {item.surname !== undefined && item.surname}</span>
                            </div>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}