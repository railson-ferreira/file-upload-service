"use client"
import React, {useEffect,useRef, useState} from 'react';

function DbConnectionErrorStatus() {
    const [status, setStatus] = useState("error")
    const timerRef = useRef<number>()

    async function loop() {
        const response = await fetch("/api/file")
        if(response.status == 200){
            setStatus("success")
            window.clearInterval(timerRef.current!)
            location.reload()
        }
    }

    useEffect(() => {
        timerRef.current = window.setInterval(loop,2000)
    },[])
    return (
        <>
            {status==="error"
            ?<div style={{color: "red"}}>Error connecting to database</div>
            :<div style={{color: "green"}}>Connection established!</div>
            }
        </>
    );
}

export default DbConnectionErrorStatus;