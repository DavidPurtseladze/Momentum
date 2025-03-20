import React from 'react';

const CheckBox = (props) => {
    return (
        <>
            <label className="flex leading-6 gap-[0.9375rem] items-center text-primary-text" htmlFor={props.type + "-" + props.item.id}>
                <input className="hidden peer" type="checkbox" id={props.type + "-" + props.item.id} name={props.type + "-" + props.item.id} value={props.type + "-" + props.item.id}
                       checked={props.filters.some((el) => el.id === props.item.id && el.type === props.type)}
                       onChange={(e) =>
                           props.setFilters((prev) =>
                               e.target.checked
                                   ? [...prev, { id: props.item.id, type: props.type, name: props.item.name }]
                                   : prev.filter((el) => el.id !== props.item.id || el.type !== props.type)
                           )
                       }/>

                <div className="w-[1.375rem] h-[1.375rem] rounded-md border border-purple flex justify-center items-center [&>*]:hidden peer-checked:[&>*]:block">
                    <svg className="w-2.5 pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                        <path d="M12.3333 1.33325L4.99996 8.66659L1.66663 5.33325" stroke="#8338EC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>

                {props.item.avatar ? (
                    <img src={props.item.avatar} className="w-7 h-7 rounded-full object-cover" alt="Profile Photo" />
                ) : null}

                {props.item.name}  {props.item.surname !== undefined && props.item.surname}
            </label>
        </>
    );
};

export default CheckBox;