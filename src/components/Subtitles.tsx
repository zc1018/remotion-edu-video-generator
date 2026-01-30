import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export interface Subtitle {
    text: string;
    startFrame: number;
    endFrame: number;
}

export const Subtitles: React.FC<{ subtitles: Subtitle[] }> = ({ subtitles }) => {
    const frame = useCurrentFrame();

    const activeSubtitle = subtitles.find(s => frame >= s.startFrame && frame <= s.endFrame);

    if (!activeSubtitle) return null;

    return (
        <AbsoluteFill style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 40,
            pointerEvents: 'none'
        }}>
            <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '10px 30px',
                borderRadius: 15,
                fontSize: 32,
                fontWeight: 'bold',
                textAlign: 'center',
                maxWidth: '80%',
                fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)'
            }}>
                {activeSubtitle.text}
            </div>
        </AbsoluteFill>
    );
};
