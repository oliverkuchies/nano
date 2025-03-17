import {
    sha256
} from 'js-sha256'

export const AWS_CONTENT_SHA256_HEADER = 'x-amz-content-sha256'

export function hashBody(body : unknown) {
    const bodyAsString = JSON.stringify(body)
    return sha256(bodyAsString)
}

export async function fetchWithSha256Headers(url: string, options: RequestInit = {}) {
    if (options.body === undefined) {
        return fetch(url, options)
    }

    const optionsWithHashedHeader = {
        ...options,
        headers: {
            ...options.headers,
            [AWS_CONTENT_SHA256_HEADER]: hashBody(options.body)
        }
    }

    return fetch(url, optionsWithHashedHeader)
}
