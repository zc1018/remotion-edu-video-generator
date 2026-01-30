import { Whiteboard } from '../../src/components/Whiteboard';
import { HighlightedText } from '../../src/components/AnnotatedText';

export const AnnotatedSceneExample = () => {
    return (
        <Whiteboard>
            <h2 style={{ fontSize: 40, color: '#E53935' }}>实战演示：如何批改作文</h2>

            <div style={{ fontSize: 32, lineHeight: 2, padding: 40, backgroundColor: '#fff', borderRadius: 10 }}>
                I have <HighlightedText text="keen interest" annotation="circle" color="#1E88E5" delay={30} />
                in this project. However, the <HighlightedText text="deadline" annotation="underline" color="#FBC02D" delay={60} />
                is too <HighlightedText text="tightly" annotation="strike" color="#E53935" delay={90} /> (tight).
            </div>

            <p style={{ marginTop: 40, fontSize: 24, color: '#666' }}>
                * 蓝色圈线表示重点关注<br />
                * 黄色下划线表示关键信息<br />
                * 红色划线表示语法纠错
            </p>
        </Whiteboard>
    );
};
