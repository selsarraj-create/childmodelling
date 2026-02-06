import { NextResponse } from 'next/server';
import crypto from 'crypto';

const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

function hash(value: string) {
    return crypto.createHash('sha256').update(value).digest('hex');
}

export async function POST(request: Request) {
    if (!PIXEL_ID || !ACCESS_TOKEN) {
        return NextResponse.json({ error: 'Missing Meta credentials' }, { status: 500 });
    }

    try {
        const body = await request.json();
        const { email, phone, firstName, lastName, childName, gender, age, postCode, eventId, sourceUrl } = body;

        const currentTimestamp = Math.floor(Date.now() / 1000);

        const userData = {
            em: email ? [hash(email.toLowerCase().trim())] : [],
            ph: phone ? [hash(phone.replace(/\D/g, ''))] : [], // Normalize phone
            fn: firstName ? [hash(firstName.toLowerCase().trim())] : [],
            ln: lastName ? [hash(lastName.toLowerCase().trim())] : [],
            ct: [], // City
            st: [], // State
            zp: postCode ? [hash(postCode.replace(/\s/g, '').toLowerCase())] : [],
            country: [hash('uk')], // Assuming UK for now based on context
        };

        const eventData = {
            data: [
                {
                    event_name: 'Lead',
                    event_time: currentTimestamp,
                    event_id: eventId, // Critical for deduplication
                    event_source_url: sourceUrl,
                    action_source: 'website',
                    user_data: userData,
                    custom_data: {
                        child_name: childName,
                        gender: gender,
                        age: age,
                        currency: 'GBP',
                        value: 0
                    }
                }
            ]
        };

        const response = await fetch(`https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Meta CAPI Error:', errorData);
            return NextResponse.json({ error: 'Failed to send to CAPI', details: errorData }, { status: 400 });
        }

        return NextResponse.json({ success: true, deduplicationId: eventId });

    } catch (error) {
        console.error('Meta CAPI Handler Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
