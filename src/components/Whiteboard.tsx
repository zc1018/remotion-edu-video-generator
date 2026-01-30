import { AbsoluteFill } from 'remotion';

export const Whiteboard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AbsoluteFill style={{
            backgroundColor: '#FDFBF7',
            backgroundImage: `
                radial-gradient(#d1d1d1 1px, transparent 1px),
                linear-gradient(to right, #f0f0f0 1px, transparent 1px),
                linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px, 100px 100px, 100px 100px',
            padding: 80,
            fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif'
        }}>
            <div style={{
                border: '12px solid #5D4037',
                borderRadius: 20,
                height: '100%',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                boxShadow: 'inset 0 0 50px rgba(0,0,0,0.05), 0 20px 40px rgba(0,0,0,0.1)',
                padding: 40,
                position: 'relative',
                overflow: 'hidden'
            }}>
                {children}
            </div>
            {/* Eraser and Marker Props for Realism */}
            <div style={{
                position: 'absolute',
                bottom: 40,
                right: 120,
                display: 'flex',
                gap: 20,
                opacity: 0.8
            }}>
                <div style={{ width: 120, height: 40, backgroundColor: '#333', borderRadius: 5, boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }} />
                <div style={{ width: 80, height: 15, backgroundColor: '#E53935', borderRadius: 10, transform: 'rotate(-5deg)' }} />
                <div style={{ width: 80, height: 15, backgroundColor: '#1E88E5', borderRadius: 10, transform: 'rotate(10deg)' }} />
            </div>
        </AbsoluteFill>
    );
};
