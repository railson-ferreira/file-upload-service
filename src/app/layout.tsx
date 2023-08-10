import {bgColor} from "@/app/brand";
import React from "react";

export const metadata = {
    title: 'File Upload Service',
    description: 'For Development Purposes',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body style={{color: "#FFFFFF", background: bgColor, margin: 0, padding: 0}}>
        {children}
        </body>
        </html>
    )
}
