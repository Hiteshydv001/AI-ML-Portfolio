import { NextRequest, NextResponse } from 'next/server';

// Read backend URL from environment. Prefer server-only env var `BACKEND_URL`,
// fall back to `NEXT_PUBLIC_BACKEND_URL` if needed (useful in some hosting setups).
const _BACKEND_BASE = process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL;
// Ensure we post to the /chat endpoint. If user sets BACKEND_URL to
// `https://host/api/v1` we will normalize to `https://host/api/v1/chat`.
const BACKEND_URL = _BACKEND_BASE
    ? _BACKEND_BASE.replace(/\/+$/, '') + '/chat'
    : undefined;

export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}

export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        // fail fast if backend URL isn't configured
        if (!BACKEND_URL) {
            console.error('BACKEND_URL is not configured');
            return NextResponse.json(
                { error: 'Backend URL not configured on server' },
                { status: 500 }
            );
        }

        console.log('Using BACKEND_URL for chat proxy:', BACKEND_URL);

        const { message, chat_history } = await req.json();
        console.log('Received request:', { message, chat_history });

        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/event-stream',
            },
            body: JSON.stringify({
                message,
                chat_history: chat_history || []
            }),
        });

        if (!response.ok) {
            // Read backend body for diagnostics (may be empty)
            let backendText = '';
            try {
                backendText = await response.text();
            } catch (e) {
                backendText = '<unable to read response body>';
            }
            console.error('Backend API error:', response.status, backendText);
            // Return a Bad Gateway with backend details to help debugging.
            return NextResponse.json(
                { error: 'Backend API error', status: response.status, details: backendText },
                { status: 502 }
            );
        }

        // Create a new ReadableStream to handle the streaming response
        const stream = new ReadableStream({
            async start(controller) {
                const reader = response.body?.getReader();
                if (!reader) {
                    controller.close();
                    return;
                }

                const textDecoder = new TextDecoder();
                let buffer = '';

                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        
                        if (done) {
                            // Process any remaining data in the buffer
                            if (buffer.trim()) {
                                controller.enqueue(new TextEncoder().encode(`data: ${buffer}\n\n`));
                            }
                            controller.close();
                            break;
                        }

                        // Decode the chunk and add to buffer
                        buffer += textDecoder.decode(value, { stream: true });

                        // Process complete lines from the buffer
                        const lines = buffer.split('\n');
                        buffer = lines.pop() || ''; // Keep the last incomplete line

                        // Forward complete lines
                        for (const line of lines) {
                            if (line.trim()) {
                                controller.enqueue(new TextEncoder().encode(`${line}\n\n`));
                            }
                        }
                    }
                } catch (error) {
                    console.error('Stream processing error:', error);
                    controller.error(error);
                }
            }
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (error) {
        console.error('Error in chat API:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
} 