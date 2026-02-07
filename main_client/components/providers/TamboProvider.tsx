'use client';

import { TamboProvider as TamboSDKProvider } from '@tambo-ai/react';
import { tamboComponents } from '@/lib/tambo-components';

interface TamboProviderProps {
    children: React.ReactNode;
}

export function TamboProvider({ children }: TamboProviderProps) {
    const tamboApiKey = process.env.NEXT_PUBLIC_TAMBO_API_KEY;

    if (!tamboApiKey) {
        console.warn('Tambo API key not found. Set NEXT_PUBLIC_TAMBO_API_KEY in .env.local');
    }

    return (
        <TamboSDKProvider
            components={tamboComponents}
            apiKey={tamboApiKey || ''}
        >
            {children}
        </TamboSDKProvider>
    );
}
