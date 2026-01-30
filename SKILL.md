---
name: edu-video-generator
description: A workflow for generating professional educational videos with ElevenLabs narration, BGM, whiteboard effects, and synchronized subtitles.
metadata:
  tags: remotion, educational, video, elevenlabs, subtitles, bgm, whiteboard
---

# Educational Video Generator Skill (Pro)

This skill provides a standardized workflow and premium components for creating high-production "Teacher Style" educational videos.

## Core Features
1. **Premium Narration**: ElevenLabs integration for human-like, multi-tonal Chinese narration.
2. **Dynamic Data Viz**: Built-in components for `ScoreCurve` and `CompetencyRadar` charts.
3. **Automated Subtitles**: Synchronized, high-contrast subtitle system with per-scene mapping.
4. **Interactive Annotations**: SVG "pen strokes" (underlines, circles, strikes) synced with audio.
5. **Cinematic BGM**: Support for low-volume global background music tracks.

## Workflow

### 1. Narration & Audio
Use the `scripts/generate_audio.sh` script with an ElevenLabs API key.
- Uses `eleven_multilingual_v2` for the best Chinese output.
- Automatically calculates the **exact frame duration** for Remotion sequences.

```bash
./scripts/generate_audio.sh scene1 "您的讲解脚本内容"
# Output includes: Recommended frames (30 FPS): 868
```

### 2. Composition & Subtitles
Orchestrate scenes in `Composition.tsx`. Define your subtitle mappings in `src/constants/subtitles.ts`.

```typescript
// Example Subtitle Mapping
export const MY_SUBTITLES = {
  s1: [
    { text: "大家好...", startFrame: 0, endFrame: 60 },
    { text: "欢迎来到精讲课堂", startFrame: 60, endFrame: 120 }
  ]
};
```

### 3. Visual Components
Use the specialized components under `src/components/`:
- **Whiteboard**: Root layout with textured background.
- **Subtitles**: Global overlay for text captions.
- **ScoreCurve**: Animated line graphs for trend analysis.
- **CompetencyRadar**: Radar charts for skill assessment.

### 4. BGM Integration
Add global background music with a low volume (e.g., `0.1`) and `loop` attribute at the root of your composition.

## Best Practices
- **Silence Elimination**: Always use the frame counts provided by the script for `durationInFrames`.
- **Audio Clashes**: Use `volume={0.1}` for BGM to ensure narration is the primary focus.
- **Subtitle Layout**: Keep subtitle strings short (max 20 chars per line) for optimal mobile viewing.

## Reference Files
- [scripts/generate_audio.sh](scripts/generate_audio.sh) - ElevenLabs automation.
- [src/components/Subtitles.tsx](src/components/Subtitles.tsx) - Caption component.
- [src/components/ScoreCurve.tsx](src/components/ScoreCurve.tsx) - Trend chart.
- [src/components/CompetencyRadar.tsx](src/components/CompetencyRadar.tsx) - Radar chart.
