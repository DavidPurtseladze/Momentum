import React, { useState } from 'react';
import Header from "../components/Header.jsx";

export default function TaskPage() {
    const [open, setOpen] = useState(false);



    return (
        <>
            <Header openPopUp={open} setOpenPopUp={setOpen}/>

        </>
    );
}
