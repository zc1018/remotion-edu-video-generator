#!/bin/bash

# Usage: ./generate_audio.sh "Scene name" "Text content"
SCENE_NAME=$1
TEXT_CONTENT=$2
FPS=${3:-30} # Default to 30 FPS if not provided

if [ -z "$SCENE_NAME" ] || [ -z "$TEXT_CONTENT" ]; then
    echo "Usage: ./generate_audio.sh <scene_name> <text_content> [fps]"
    exit 1
fi

mkdir -p public/audio

echo "Generating AIFF for $SCENE_NAME..."
say -v Tingting "$TEXT_CONTENT" -o "public/audio/$SCENE_NAME.aiff"

echo "Converting to MP3 and calculating duration..."
ffmpeg -i "public/audio/$SCENE_NAME.aiff" "public/audio/$SCENE_NAME.mp3" -y -loglevel quiet

# Get duration in seconds
DURATION=$(ffprobe -i "public/audio/$SCENE_NAME.mp3" -show_entries format=duration -v quiet -of csv="p=0")

# Calculate frames
FRAMES=$(echo "$DURATION * $FPS" | bc | cut -d'.' -f1)

echo "Cleaning up..."
rm "public/audio/$SCENE_NAME.aiff"

echo "------------------------------------------------"
echo "✅ Success: public/audio/$SCENE_NAME.mp3"
echo "⏱  Duration: $DURATION seconds"
echo "🎞  Recommended frames ($FPS FPS): $FRAMES"
echo "------------------------------------------------"
