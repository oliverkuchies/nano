import { describe, it, expect, beforeEach, vi } from 'vitest'
import { AWS_CONTENT_SHA256_HEADER, fetchSha256, hashBody, mutateHeaders } from './index'
import createFetchMock from 'vitest-fetch-mock';

beforeEach(() => {
  const fetchMocker = createFetchMock(vi);

  fetchMocker.mockOnce((req) => {
    if (!req.headers.get(AWS_CONTENT_SHA256_HEADER)) {
        return new Response('Missing required header', {
            status: 400,
            headers: {
            'Content-Type': 'text/plain',
            },
        });
    }

    return new Response(JSON.stringify(req), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  fetchMocker.enableMocks()
});

describe('hashBody', () => {
    it('should hash the body correctly', () => {
        const body = { key: 'value' }
        const expectedHash = 'e43abcf3375244839c012f9633f95862d232a95b00d5bc7348b3098b9fed7f32'
                
        const result = hashBody(body)
        
        expect(result).toBe(expectedHash)
    })
})

describe('fetch without sha256 headers', () => {
    it('should return a 400 error', async () => {
        const url = 'https://example.mangos'
        const body = { key: 'bobs-bananas', 'mango': 'fruit' }
    
        const options = {
            method: 'POST',
            url: url,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const response = await fetch(url, options)
        const result = await response.text()
        
        expect(response.status).toBe(400)
        expect(result).toBe('Missing required header')
    })
});

describe('fetchWithSha256Headers', () => {
    it('should add the hashed body to the headers', async () => {
        const url = 'https://example.com'
        const body = { key: 'bobs-bananas', 'mango': 'fruit' }
    
        const options = {
            method: 'POST',
            url: url,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const response = await fetchSha256(url, options)
        expect(response.status).toBe(200)
    })
})

describe('mutateHeaders', () => {
    it('should add the hashed body to the headers', () => {
        const headers = {
            'Content-Type': 'application/json'
        }
        const body = { key: 'bobs-bananas', 'mango': 'fruit' }
        const expectedHash = '8a573ca735c107f6545e687ef82913a9f3b50310b7f4c6b013fc4bacf63f11d4'
        
        const result = mutateHeaders(headers, body)
        
        expect(result[AWS_CONTENT_SHA256_HEADER]).toBe(expectedHash)
    })
});