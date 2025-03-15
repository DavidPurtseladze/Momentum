import React, { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import close from '../assets/close.svg';
import check from '../assets/check.svg';
import Select from '../components/Select';
import ImageInput from "./ImageInput.jsx";


export default function PopUp(props) {
    const [open, setOpen] = useState(true)

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg
                         bg-white text-left shadow-xl transition-all data-closed:translate-y-4
                         data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200
                         data-leave:ease-in sm:px-[3.125rem] pb-15 pt-10 sm:w-full sm:max-w-[57.5rem] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="w-full flex justify-end">
                            <button type="button" onClick={() => setOpen(false)}>
                                <img src={close} alt="Close Popup"/>
                            </button>
                        </div>

                        <h2 className="w-full text-center text-[2rem] font-medium">
                            თანამშრომლის დამატება
                        </h2>

                        <div className="grid grid-cols-2 gap-11 mb-16 mt-11">
                            <div>
                                <label className="text-secondary-text text-sm font-medium"
                                       htmlFor="name">სახელი*</label>
                                <input className="w-full h-[2.625rem] rounded-md border-[#CED4DA] border" name="name"
                                       id="name" type="text"/>

                                <div className="flex items-center gap-0.5">
                                    <img src={check} alt="Check"/>
                                    <span className="text-[0.625rem] font-[350]">მინიმუმ 2 სიმბოლო</span>
                                </div>
                                <div className="flex items-center gap-0.5">
                                    <img src={check} alt="Check"/>
                                    <span className="text-[0.625rem] font-[350]">მინიმუმ 255 სიმბოლო</span>
                                </div>
                            </div>

                            <div>
                                <label className="text-secondary-text text-sm font-medium"
                                       htmlFor="surname">გვარი*</label>
                                <input className="w-full h-[2.625rem] rounded-md border-[#CED4DA] border" name="surname"
                                       id="surname" type="text"/>

                                <div className="flex items-center gap-0.5">
                                    <img src={check} alt="Check"/>
                                    <span className="text-[0.625rem] font-[350]">მინიმუმ 2 სიმბოლო</span>
                                </div>
                                <div className="flex items-center gap-0.5">
                                    <img src={check} alt="Check"/>
                                    <span className="text-[0.625rem] font-[350]">მინიმუმ 255 სიმბოლო</span>
                                </div>
                            </div>

                            <div className="col-span-2">
                                <label className="text-secondary-text text-sm font-medium"
                                       htmlFor="image-input">ავატარი*</label>
                                <ImageInput></ImageInput>
                            </div>

                            <div>
                                <Select departamentData={props.departamentData}></Select>
                            </div>
                        </div>

                        <div className="w-full flex justify-end">
                            <button type="button" onClick={() => setOpen(false)} className="py-2.5 px-4 text-base text-primary-text border border-purple rounded-md mr-5">
                                გაუქმება
                            </button>
                            <button type="button" onClick={() => setOpen(false)} className="py-2.5 px-4 text-base bg-purple text-white rounded-md">
                                დაამატე თანამშრომელი
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

