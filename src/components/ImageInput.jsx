import {useState} from "react";
import uploadImage from "../assets/image-upload.svg";
import trash from "../assets/trash.svg";

export default function ImageInput() {
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImage(null);
    };

    return (
        <div className=" dp-dashed-border w-full h-[7.5rem] flex flex-col justify-center items-center">
            {/* Upload Input */}
            {!image && (
                <label className="cursor-pointer w-full h-full flex flex-col justify-center items-center">
                    <img src={uploadImage} alt="Upload Image"/>
                    <span className="font-sm text-secondary-text">ატვირთე ფოტო</span>
                    <input id="image-input" name="image-input" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
            )}
            {/* Image Preview */}
            {image && (
                <div className="relative">
                    <img src={image} alt="Uploaded" className="w-22 h-22 object-cover rounded-full" />


                    <button
                        onClick={removeImage}
                        className="absolute bottom-0 right-0 rounded-full"
                    >

                        <img src={trash} alt="Trash"/>
                    </button>
                </div>
            )}
        </div>
    );
}
