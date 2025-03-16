import React from "react";
import uploadImage from "../assets/image-upload.svg";
import trash from "../assets/trash.svg";

export default function ImageInput(props) {
    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Check if the file is an image
            if (!file.type.startsWith("image/")) {
                alert("ატვირთეთ მხოლოდ სურათი");
                return;
            }

            // Check if the file size is greater than 600KB
            if (file.size > 600 * 1024) {
                alert("ფაილის ზომა არ უნდა აღემატებოდეს 600KB-ს");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                props.setState(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        props.setState(null);
    };

    return (
        <>
            <label className="text-secondary-text text-sm font-medium"
                   htmlFor="image-input">ავატარი*</label>
            <div className=" dp-dashed-border w-full h-[7.5rem] flex flex-col justify-center items-center">
                {!props.state && (
                    <label className="cursor-pointer w-full h-full flex flex-col justify-center items-center">
                        <img src={uploadImage} alt="Upload Image"/>
                        <span className="font-sm text-secondary-text">ატვირთე ფოტო</span>
                        <input id="image-input" name="image-input" type="file" className="hidden" accept="image/*"
                               onChange={handleImageChange}/>
                    </label>
                )}

                {props.state && (
                    <div className="relative">
                        <img src={URL.createObjectURL(props.state)} alt="Uploaded" className="w-22 h-22 object-cover rounded-full"/>

                        <button onClick={removeImage} className="absolute bottom-0 right-0 rounded-full">
                            <img src={trash} alt="Trash"/>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
