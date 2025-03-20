import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import CheckBox from "./CheckBox.jsx";

export default function DropDown(props) {
    return (
        <Menu as="div" className="inline-block h-fit text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900">
                    {props.name}
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute left-0 z-10 mt-2.5 w-full border border-purple pt-10 pb-5 px-[1.875rem]
                origin-top-right rounded-md bg-white transition
                focus:outline-hidden data-closed:scale-95 data-closed:transform
                data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
                <div className="flex flex-col gap-5">
                    {props.data && props.data.map((item, index) => (
                        <CheckBox key={item.id} item={item} type={props.type}  filters={props.filters} setFilters={props.setFilters}></CheckBox>
                    ))}

                    <button className="ml-auto w-fit bg-purple hover:bg-light-purple duration-300 text-white py-2 px-12 rounded-[1.25rem]">არჩევა</button>

                </div>
            </MenuItems>
        </Menu>
    )
}