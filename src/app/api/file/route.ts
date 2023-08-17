import {NextRequest, NextResponse} from "next/server";

import { getLastTwenty, saveToDatabase} from "@/app/api/file/file-repository";

export async function POST(request: NextRequest) {
    // @ts-ignore
    const formData: FormData = await request.formData();
    const files = formData.getAll("file") as File[]
    const savedFiles: {[digest: string]: string}= {}

    for (let file of files) {
        if(!file?.name || file?.name === "undefined"){
            continue;
        }
        try{
            const digest = await saveToDatabase(file);
            savedFiles[digest] = file.name;
        }catch (error){
            if(error === "STORAGE_EXCEEDED"){
                return NextResponse.json({ error: 'Insufficient Storage' }, { status: 507 })
            }else{
                return NextResponse.json({ error: 'Database Unavailable' }, { status: 503 })
            }
        }
    }

    return NextResponse.json(savedFiles)
}


export async function GET(){
    try{
        const lastTwenty = await getLastTwenty()
        return NextResponse.json(lastTwenty)
    }catch (e) {
        return NextResponse.json({ error: 'Database Unavailable' }, { status: 503 })
    }
}

export const dynamic = "force-dynamic"