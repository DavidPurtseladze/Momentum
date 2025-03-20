import React, {Fragment, useEffect, useState} from 'react'
import {Dialog, DialogBackdrop, DialogPanel} from '@headlessui/react'
import close from '../assets/close.svg';
import Select from '../components/Select';
import ImageInput from "./ImageInput.jsx";
import Input from "./Input.jsx";
import {addEmployee} from "../Api.js";

export default function PopUp(props) {
    const [nameInput, setNameInput] = useState({ input: "", error: { min: null, max: null } });
    const [surnameInput, setSurnameInput] = useState({ input: "", error: { min: null, max: null } });
    const [image, setImage] = useState({ image: null, error: null });
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        if (props.departamentData && props.departamentData.length > 0) {
            setSelected(props.departamentData[0]);
        }
    }, [props.departamentData]);

    const validateSingleInput = (state, setState) => {
        let min = true;
        let max = true;
        let error = false;

        if (state.input.length < 2) {
            min = false;
            error = true;
        }

        if (state.input.length > 255) {
            max = false;
            error = true;
        }

        setState({ input: state.input, error: { min: min, max: max } });
        return error;
    };

    const addUser = async () => {
        const nameError = validateSingleInput(nameInput, setNameInput)
        const surnameError = validateSingleInput(surnameInput, setSurnameInput)

        if (image.image == null) {
            image.error = true;
            return;
        }

        if (nameError || surnameError)
            return;

        const formData = new FormData();
        formData.append("name", nameInput.input);
        formData.append("surname", surnameInput.input);
        formData.append("department_id", selected.id);
        formData.append("avatar", image.image);

        await addEmployee(formData);
        props.setOpen(false);
    };

    return (
        <Dialog open={props.open} onClose={props.setOpen} className="relative z-10">
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
                            <button type="button" onClick={() => props.setOpen(false)}>
                                <img src={close} alt="Close Popup"/>
                            </button>
                        </div>

                        <h2 className="w-full text-center text-[2rem] font-medium">
                            თანამშრომლის დამატება
                        </h2>

                        <div className="grid grid-cols-2 gap-11 mb-16 mt-11">
                            <Input label="სახელი*" input="name" state={nameInput} setState={setNameInput}></Input>
                            <Input label="გვარი*" input="surname" state={surnameInput} setState={setSurnameInput}></Input>

                            <div className="col-span-2">
                                <ImageInput state={image} setState={setImage}></ImageInput>
                            </div>

                            <div>
                                <label className="text-secondary-text text-sm font-medium mb-2">დეპარტამენტი*</label>
                                {selected !== null && (<Select state={selected} setState={setSelected} departamentData={props.departamentData}></Select>)}
                            </div>
                        </div>

                        <div className="w-full flex justify-end">
                            <button type="button" onClick={() => props.setOpen(false)} className="py-2.5 px-4 text-base text-primary-text border border-purple hover:border-light-purple duration-300 rounded-md mr-5">
                                გაუქმება
                            </button>
                            <button type="button" onClick={addUser} className="py-2.5 px-4 text-base hover:bg-light-purple duration-300 text-white rounded-md">
                                დაამატე თანამშრომელი
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

