import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Whiteboard } from './Whiteboard';

const DATA = [5.0, 4.5, 5.5, 6.0, 6.5, 7.0, 8.0];
const DAYS = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

export const ScoreCurve: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    const chartWidth = 1000;
    const chartHeight = 400;
    const padding = 60;

    const progress = spring({
        frame,
        fps,
        config: { damping: 15 },
        durationInFrames: 60
    });

    return (
        <Whiteboard>
            <h2 style={{ fontSize: 48, color: '#5D4037', marginBottom: 40 }}>成绩趋势曲线</h2>
            <div style={{ position: 'relative', width: chartWidth, height: chartHeight + padding, margin: '0 auto' }}>
                {/* Axes */}
                <div style={{ position: 'absolute', bottom: padding, left: 0, right: 0, height: 2, backgroundColor: '#333' }} />
                <div style={{ position: 'absolute', bottom: padding, left: 0, top: 0, width: 2, backgroundColor: '#333' }} />

                {/* Y Axis Labels */}
                {[0, 2, 4, 6, 8, 10].map(val => (
                    <div key={val} style={{
                        position: 'absolute',
                        bottom: padding + (val / 10) * chartHeight - 10,
                        left: -40,
                        fontSize: 20,
                        color: '#666'
                    }}>
                        {val}
                    </div>
                ))}

                {/* Grid Lines */}
                {[0, 2, 4, 6, 8, 10].map(val => (
                    <div key={val} style={{
                        position: 'absolute',
                        bottom: padding + (val / 10) * chartHeight,
                        left: 0,
                        right: 0,
                        height: 1,
                        backgroundColor: '#eee'
                    }} />
                ))}

                {/* The Curve */}
                <svg width={chartWidth} height={chartHeight} style={{ position: 'absolute', bottom: padding, left: 0, overflow: 'visible' }}>
                    <path
                        d={DATA.map((val, i) => {
                            const x = (i / (DATA.length - 1)) * chartWidth;
                            const y = chartHeight - (val / 10) * chartHeight;
                            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="#FF4F4F"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray={2000}
                        strokeDashoffset={2000 * (1 - progress)}
                    />
                    {/* Data Points */}
                    {DATA.map((val, i) => {
                        const x = (i / (DATA.length - 1)) * chartWidth;
                        const y = chartHeight - (val / 10) * chartHeight;
                        const pointProgress = spring({ frame: frame - i * 5, fps });
                        return (
                            <circle
                                key={i}
                                cx={x} cy={y}
                                r={8 * pointProgress}
                                fill="#FF4F4F"
                                stroke="white"
                                strokeWidth="3"
                            />
                        );
                    })}
                </svg>

                {/* X Axis Labels */}
                {DAYS.map((day, i) => (
                    <div key={day} style={{
                        position: 'absolute',
                        bottom: 10,
                        left: (i / (DAYS.length - 1)) * chartWidth - 30,
                        fontSize: 20,
                        color: '#333',
                        fontWeight: i === 6 ? 'bold' : 'normal'
                    }}>
                        {day}
                    </div>
                ))}

                {/* Highlight Point */}
                {frame > 60 && (
                    <div style={{
                        position: 'absolute',
                        left: chartWidth + 20,
                        top: 40,
                        backgroundColor: '#FFF9C4',
                        padding: '10px 20px',
                        borderRadius: 10,
                        border: '2px solid #FBC02D',
                        fontSize: 24,
                        opacity: spring({ frame: frame - 60, fps })
                    }}>
                        <b>突破 8.0 分！</b><br />
                        <small>Day 7 - Traditional Culture</small>
                    </div>
                )}
            </div>

            <div style={{ marginTop: 60, fontSize: 28, color: '#666', textAlign: 'center' }}>
                提分幅度：<span style={{ color: '#FF4F4F', fontWeight: 'bold' }}>+3.0 分</span> (5.0 ➜ 8.0)
            </div>
        </Whiteboard>
    );
};
