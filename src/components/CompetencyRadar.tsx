import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Whiteboard } from './Whiteboard';

const ABILITIES = [
    { label: '内容贴题', score: 7.1 },
    { label: '语域格式', score: 6.4 },
    { label: '词汇语法', score: 6.1 },
    { label: '逻辑连贯', score: 6.0 }
];

export const CompetencyRadar: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const size = 500;
    const cx = size / 2;
    const cy = size / 2;
    const radius = 200;

    const progress = spring({ frame, fps, config: { damping: 15 } });

    return (
        <Whiteboard>
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: 48, color: '#5D4037', marginBottom: 40 }}>四维能力评估</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>
                        {ABILITIES.map((a, i) => (
                            <div key={a.label} style={{
                                fontSize: 24,
                                padding: '15px 25px',
                                backgroundColor: i === 3 ? '#FFEBEE' : '#F5F5F5',
                                borderRadius: 10,
                                borderLeft: `8px solid ${i === 3 ? '#E53935' : '#43A047'}`,
                                opacity: spring({ frame: frame - i * 10, fps })
                            }}>
                                <b>{a.label}</b>: {a.score} 分
                                <span style={{ marginLeft: 20, fontSize: 18, color: '#666' }}>
                                    {i === 0 ? '优势项目' : i === 3 ? '潜力提升项' : '良好'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <svg width={size} height={size} style={{ overflow: 'visible' }}>
                        {/* Radar Background Grids */}
                        {[0.2, 0.4, 0.6, 0.8, 1].map(scale => (
                            <polygon
                                key={scale}
                                points={ABILITIES.map((_, i) => {
                                    const angle = (i / ABILITIES.length) * 2 * Math.PI - Math.PI / 2;
                                    const r = radius * scale;
                                    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
                                }).join(' ')}
                                fill="none"
                                stroke="#ddd"
                                strokeWidth="1"
                            />
                        ))}

                        {/* Axes */}
                        {ABILITIES.map((_, i) => {
                            const angle = (i / ABILITIES.length) * 2 * Math.PI - Math.PI / 2;
                            return (
                                <line
                                    key={i}
                                    x1={cx} y1={cy}
                                    x2={cx + radius * Math.cos(angle)}
                                    y2={cy + radius * Math.sin(angle)}
                                    stroke="#ddd"
                                    strokeWidth="1"
                                />
                            );
                        })}

                        {/* Radar Shape */}
                        <polygon
                            points={ABILITIES.map((a, i) => {
                                const angle = (i / ABILITIES.length) * 2 * Math.PI - Math.PI / 2;
                                const r = radius * (a.score / 10) * progress;
                                return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
                            }).join(' ')}
                            fill="rgba(33, 150, 243, 0.3)"
                            stroke="#2196F3"
                            strokeWidth="4"
                        />

                        {/* Labels on SVG */}
                        {ABILITIES.map((a, i) => {
                            const angle = (i / ABILITIES.length) * 2 * Math.PI - Math.PI / 2;
                            const labelR = radius + 40;
                            return (
                                <text
                                    key={i}
                                    x={cx + labelR * Math.cos(angle)}
                                    y={cy + labelR * Math.sin(angle)}
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                    fontSize="20"
                                    fill="#333"
                                    fontWeight="bold"
                                >
                                    {a.label}
                                </text>
                            );
                        })}
                    </svg>
                </div>
            </div>
        </Whiteboard>
    );
};
