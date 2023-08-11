import {getFromDatabase} from "@/app/api/file/file-repository";
import {NextRequest, NextResponse} from "next/server";
import {isValidSha256} from "@/utils/is-valid-sha256";

export async function GET(request: NextRequest){
    // @ts-ignore
    const url: URL = request.nextUrl
    const input = url.pathname.split("/")[3]
    const digest = input.split(".")[0]
    if(!isValidSha256(digest)){
        return NextResponse.json({ error: 'Digest is not a valid SHA256' }, { status: 400 })
    }

    try{
        const fileData = await getFromDatabase(digest)

        return new Response(fileData.buffer, { headers: {
            'Content-Type': fileData.mimeType,
                "Content-Disposition": `inline; filename="${fileData.name}"`
        } });
    }catch (error){
        if(error === "NOT_FOUND"){
            return NextResponse.json({ error: 'Not Found' }, { status: 404 })
        }
    }
    return NextResponse.json({ error: 'Unknown Error' }, { status: 500 })
}

export const dynamic = "force-dynamic"