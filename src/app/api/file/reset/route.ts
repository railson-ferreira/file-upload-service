import {deleteWithoutWhere} from "@/app/api/file/file-repository";
import { NextResponse} from "next/server";

export async function GET(){
    await deleteWithoutWhere()

    return NextResponse.json({ok: true})
}

export const dynamic = "force-dynamic"