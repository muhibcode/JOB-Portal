import { NextResponse } from "next/server";

const alloweParams = [
    'keyword',
    'jobType',
    'education',
    'experience',
    'location',
    'salary',
    'page'
]

export async function middleware(req) {
    const url = req.nextUrl;
    let changed = false;
    url.searchParams.forEach((param, key) => {
        if (!alloweParams.includes(key)) {
            url.searchParams.delete(key);
            changed = true;
        }
    });

    if (changed) {
        return NextResponse.redirect(url)
    }
}

export const config = {
    matcher: '/'
}

