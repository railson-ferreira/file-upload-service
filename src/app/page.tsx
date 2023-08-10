import React from "react"
import {linkColor, primaryColorLight} from "@/app/brand";
import FileForm from "@/app/FileForm";
import Announcement from "@/app/announcement";
import mimeDb from "@/utils/mime-db.json";
import {getLastTwenty} from "@/app/api/file/file-repository";


export default async function Home(){
    const lastTwentyFiles = await getLastTwenty();
    return (
        <>
            <Announcement/>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100svw",
                height: "100svh"
            }}>
                <div>
                    <strong>Last 20 files:</strong>
                    <ul style={{color: primaryColorLight}}>
                        {lastTwentyFiles.map((file,idx) => {
                            // @ts-ignore
                            const extension = mimeDb[file.mimeType]?.extensions?.[0];
                            return (
                                <li key={idx} title={file.name}>
                                    <a href={"/api/file/" + file.digest+(extension?"."+extension:"")} style={{color: linkColor}}>{extension&&`(${extension})`} {file.digest}</a>
                                </li>
                            )
                        })}
                    </ul>
                    <FileForm/>
                </div>
            </div>

        </>
    )
}

export const dynamic = "force-dynamic"