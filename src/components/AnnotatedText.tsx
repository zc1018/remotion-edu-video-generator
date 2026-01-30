import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const MarkerAnnotation: React.FC<{
    type: 'underline' | 'circle' | 'strike';
    color: string;
    delay: number;
    duration?: number;
}> = ({ type, color, delay, duration = 30 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const progress = spring({
        frame: frame - delay,
        fps,
        config: { damping: 20 },
        durationInFrames: duration
    });

    if (frame < delay) return null;

    if (type === 'underline') {
        return (
            <div style={{
                position: 'absolute',
                bottom: -4,
                left: 0,
                height: 4,
                backgroundColor: color,
                width: `${progress * 100}%`,
                borderRadius: 2,
                opacity: 0.7
            }} />
        );
    }

    if (type === 'strike') {
        return (
            <div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                height: 3,
                backgroundColor: color,
                width: `${progress * 100}%`,
                transform: 'translateY(-50%)',
                opacity: 0.8
            }} />
        );
    }

    if (type === 'circle') {
        const strokeDasharray = 1000;
        const strokeDashoffset = strokeDasharray * (1 - progress);
        return (
            <svg style={{
                position: 'absolute',
                top: '-10%',
                left: '-5%',
                width: '110%',
                height: '120%',
                overflow: 'visible',
                pointerEvents: 'none'
            }}>
                <ellipse
                    cx="50%" cy="50%" rx="52%" ry="55%"
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    opacity={0.6}
                    transform="rotate(-2, 50, 50)"
                />
            </svg>
        );
    }

    return null;
};

export const HighlightedText: React.FC<{
    text: string;
    annotation?: 'underline' | 'circle' | 'strike';
    color?: string;
    delay?: number;
    style?: React.CSSProperties;
}> = ({ text, annotation, color = '#FF4F4F', delay = 0, style }) => {
    return (
        <span style={{ position: 'relative', display: 'inline-block', ...style }}>
            {text}
            {annotation && <MarkerAnnotation type={annotation} color={color} delay={delay} />}
        </span>
    );
};
