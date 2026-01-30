import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Whiteboard } from './Whiteboard';

export const FinalSummaryScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const progress = spring({ frame, fps, config: { damping: 12 } });

    return (
        <Whiteboard>
            <div style={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2 style={{ fontSize: 56, color: '#333', marginBottom: 40, transform: `scale(${progress})` }}>
                    7 天蜕变，未来可期！
                </h2>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 40 }}>
                    <div style={{
                        flex: 1,
                        maxWidth: 400,
                        backgroundColor: '#E8F5E9',
                        padding: 30,
                        borderRadius: 20,
                        border: '2px solid #4CAF50',
                        opacity: spring({ frame: frame - 30, fps })
                    }}>
                        <h3 style={{ color: '#2E7D32', marginBottom: 20 }}>下一步行动 (Action Plan)</h3>
                        <ul style={{ textAlign: 'left', fontSize: 20, color: '#444', lineHeight: 1.8 }}>
                            <li>✅ 深度扫除“主谓一致”顽疾</li>
                            <li>✅ 积累 20 个高级学术连接词</li>
                            <li>✅ 保持每日拼写校对习惯</li>
                        </ul>
                    </div>

                    <div style={{
                        flex: 1,
                        maxWidth: 400,
                        backgroundColor: '#FFF3E0',
                        padding: 30,
                        borderRadius: 20,
                        border: '2px solid #FF9800',
                        opacity: spring({ frame: frame - 60, fps })
                    }}>
                        <h3 style={{ color: '#E65100', marginBottom: 20 }}>老师寄语</h3>
                        <p style={{ fontSize: 22, color: '#5D4037', fontStyle: 'italic', lineHeight: 1.6 }}>
                            "扫清那些‘顽固的小石子’，满分作文就在不远处。保持这种势头，我们考场见！"
                        </p>
                    </div>
                </div>

                {/* Badge */}
                <div style={{
                    marginTop: 60,
                    fontSize: 32,
                    color: '#E91E63',
                    fontWeight: 'bold',
                    opacity: spring({ frame: frame - 90, fps }),
                    transform: `rotate(-5deg)`
                }}>
                    ⭐ 新东方写作营 · 优秀学员 ⭐
                </div>
            </div>
        </Whiteboard>
    );
};
