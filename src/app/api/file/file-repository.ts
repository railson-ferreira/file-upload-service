import mysql from "mysql";
import arrayBufferToBufferCycle from "@/utils/array-buffer-to-buffer-cycle";
import arrayBufferToBase64 from "@/utils/array-buffer-to-base64";
import CryptoJS from "crypto-js";
import {isValidSha256} from "@/utils/is-valid-sha256";

export async function saveToDatabase(file: File) {
    const connection = getDatabaseConnection()

    const results: object[] = await new Promise((resolve, reject) => {
        connection.query('SELECT COUNT(*) from files', function (error, results) {
            if (error) reject(error);
            resolve(results)
        });
    })
    // @ts-ignore
    const count = results[0]["COUNT(*)"];

    if (count > 100) {
        throw "STORAGE_EXCEEDED"
    }


    const fileArrayBuffer = await file.arrayBuffer();
    const fileBuffer = arrayBufferToBufferCycle(fileArrayBuffer)
    const fileBase64 = arrayBufferToBase64(fileArrayBuffer)
    const digest = CryptoJS.SHA256(CryptoJS.enc.Base64.parse(fileBase64)).toString();
    const query = "INSERT INTO files SET ?",
        values = {
            name: file.name,
            digest: digest,
            mimeType: file.type,
            bytes: fileBuffer,
        };

    await new Promise((resolve, reject) => {
        connection.query(query, values, function (error) {
            if (error) reject(error);
            resolve(results)
        });
    })
    connection.end();

    return digest;
}


export async function getFromDatabase(digest: string) {
    const connection = getDatabaseConnection()

    if (!isValidSha256(digest)) {
        throw "INVALID_DIGEST"
    }
    const results: object[] = await new Promise((resolve, reject) => {
        connection.query(`SELECT * from files where digest = '${digest}' LIMIT 1`, function (error, results) {
            if (error) reject(error);
            resolve(results)
        });
    })
    if (!results.length) {
        throw "NOT_FOUND"
    }
    const result: any = results[0]


    return {
        name: result["name"] as string,
        mimeType: result["mimeType"] as string,
        buffer: result["bytes"] as Buffer
    }
}

export async function getLastTwenty(){
    const connection = getDatabaseConnection()

    const results: object[] = await new Promise((resolve, reject) => {
        connection.query("SELECT * FROM (SELECT * FROM files ORDER BY id DESC LIMIT 20) AS sub ORDER BY id ASC", function (error, results) {
            if (error) reject(error);
            resolve(results)
        });
    })
    connection.end();

    return results.map((result: any)=>{
        return {
            name: result["name"] as string,
            digest: result["digest"] as string,
            mimeType: result["mimeType"] as string
        }
    })
}

export async function deleteWithoutWhere(){
    const connection = getDatabaseConnection()

    await new Promise((resolve, reject) => {
        connection.query("DELETE FROM files", function (error, results) {
            if (error) reject(error);
            resolve(results)
        });
    })
    connection.end();
}


function getDatabaseConnection() {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    connection.connect();

    return connection;
}