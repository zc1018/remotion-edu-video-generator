#!/bin/bash

# Usage: ./generate_audio.sh "Scene name" "Text content"
SCENE_NAME=$1
TEXT_CONTENT=$2
FPS=${3:-30} # Default to 30 FPS if not provided

# API Settings
API_KEY="sk_e5ce5c1a87c3b0c108450635ce80292bcb3734e852f599fe"
# Using "Rachel" (21m00Tcm4TlvDq8ikWAM) as she is known for clear narration
# Alternately "Alice" (Xb7hHqWq9Vv9Vv9Vv9Vv)
VOICE_ID="21m00Tcm4TlvDq8ikWAM" 
MODEL_ID="eleven_multilingual_v2"

if [ -z "$SCENE_NAME" ] || [ -z "$TEXT_CONTENT" ]; then
    echo "Usage: ./generate_audio.sh <scene_name> <text_content> [fps]"
    exit 1
fi

mkdir -p public/audio

echo "Generating ElevenLabs audio for $SCENE_NAME..."
curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_ID" \
     -H "Content-Type: application/json" \
     -H "xi-api-key: $API_KEY" \
     -d "{
  \"text\": \"$TEXT_CONTENT\",
  \"model_id\": \"$MODEL_ID\",
  \"voice_settings\": {
    \"stability\": 0.5,
    \"similarity_boost\": 0.8,
    \"style\": 0.0,
    \"use_speaker_boost\": true
  }
}" -o "public/audio/$SCENE_NAME.mp3"

# Check if file was actually generated (not an error JSON)
if grep -q "detail" "public/audio/$SCENE_NAME.mp3"; then
    echo "❌ Error in ElevenLabs API response:"
    cat "public/audio/$SCENE_NAME.mp3"
    exit 1
fi

echo "Calculating duration..."
# Get duration in seconds
DURATION=$(ffprobe -i "public/audio/$SCENE_NAME.mp3" -show_entries format=duration -v quiet -of csv="p=0")

# Calculate frames
FRAMES=$(echo "$DURATION * $FPS" | bc | cut -d'.' -f1)

echo "------------------------------------------------"
echo "✅ Success: public/audio/$SCENE_NAME.mp3"
echo "⏱  Duration: $DURATION seconds"
echo "🎞  Recommended frames ($FPS FPS): $FRAMES"
echo "------------------------------------------------"
