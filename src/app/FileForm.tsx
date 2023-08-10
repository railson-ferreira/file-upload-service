"use client"
import React, {SyntheticEvent, useState} from 'react';

function FileForm() {
    const [fileQuantity, setFileQuantity] = useState(1);

    function onAddMoreClick(event: SyntheticEvent){
        setFileQuantity(old=>++old)

        event.preventDefault()
    }

    function onRemoveClick(event: SyntheticEvent){
        if(fileQuantity>1){
            setFileQuantity(old=>--old);
        }

        event.preventDefault()
    }

    return (
        <form action={"/api/file"} method={"post"}  encType={"multipart/form-data"}>
            {Array(fileQuantity).fill(null).map((_,idx)=>{
                return (
                    <div key={idx}>
                        <input type={"file"} name={"file"}/>

                    </div>
                )
            })}
            <button onClick={onAddMoreClick}>
                Add more
            </button>
            {fileQuantity>1 && <button onClick={onRemoveClick}>Remove last one</button>}
            <br/>

            <button>Upload!</button>
        </form>
    );
}

export default FileForm;