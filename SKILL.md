---
name: edu-video-generator
description: A workflow for generating professional educational videos with Chinese narration, whiteboard effects, and interactive annotations in Remotion.
metadata:
  tags: remotion, educational, video, narration, whiteboard, marker, calligraphy
---

# Educational Video Generator Skill

This skill provides a standardized workflow and reusable components for creating "Teacher Style" educational videos.

## Core Features
1. **Bilingual Whiteboard Layout**: A realistic, textured board background with teacher props.
2. **Interactive Annotations**: SVG-driven "pen strokes" (underlines, circles, strikes) that sync with narration.
3. **Automated Narration Pipeline**: Process for generating high-quality Chinese TTS and integrating it into Remotion.
4. **Optimized Rendering**: Pre-configured render scripts for long-form (5min+) high-fidelity output.

## Workflow

### 1. Narration Scripting
Break down the educational content into 4-6 distinct scenes (e.g., Intro, Analysis, Case Study, Upgrade, Conclusion). Write the Chinese narration script for each scene.

### 2. Audio Generation
Use the system `say` command (voice: Tingting) to generate audio, then convert to `.mp3` for maximum compatibility with Remotion's audio analysis tools.

> [!TIP]
> Use the provided script `scripts/generate_audio.sh` to automate this. It will also calculate the **exact frame duration** required for your Remotion composition.

```bash
# Example
./scripts/generate_audio.sh scene1 "您的讲解脚本内容"
# Output will include: Recommended frames (30 FPS): 868
```

### 3. Scene Development
Use the provided `Whiteboard`, `AnnotatedText`, and `HighlightedText` components to build the visuals.

- **Whiteboard**: Use as the root container of each scene.
- **HighlightedText**: Wrap keywords to add interactive marker effects. Specify `annotation`, `color`, and `delay`.

### 4. Composition Orchestration
Use `Series` and `Series.Sequence` in `Composition.tsx` to align audio files with their respective scenes. 
**Crucial**: Set the `durationInFrames` for each `Series.Sequence` to the exact value provided by the `generate_audio.sh` script (plus a 5-10 frame buffer) to eliminate dead air and silences.

### 5. High-Fidelity Rendering
For videos longer than 60 seconds, use a custom `render.ts` script with `concurrency` control to prevent browser pool crashes.

## Best Practices
- **Spring Timings**: Use `damping: 15-20` for marker effects to avoid excessive flickering/overshoot.
- **Audio Overlap**: Add a small buffer (5-10 frames) at the end of sequences to prevent abrupt audio cuts.
- **Font Rendering**: Always specify `fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif'` for consistent Chinese character display in Headless Chrome.
- **Resource Management**: Prefer `.mp3` for audio and `.jpeg` for static backgrounds to reduce render memory footprint.

## Reference Files
- [scripts/generate_audio.sh](scripts/generate_audio.sh) - Automation for TTS generation.
- [examples/annotated_scene.tsx](examples/annotated_scene.tsx) - Example of a highly interactive correction scene.
- [resources/whiteboard_theme.json](resources/whiteboard_theme.json) - Standard color palette for educational videos.
