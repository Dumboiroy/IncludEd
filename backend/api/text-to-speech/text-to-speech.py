from kokoro import KPipeline
import sys
import os
import uuid
import json
import soundfile as sf

def main():
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Usage: speech_generator.py <text> <voice>"}))
        sys.exit(1)

    text = sys.argv[1]
    voice = sys.argv[2]

    output_dir = os.path.join(os.path.dirname(__file__), 'output_audio')
    os.makedirs(output_dir, exist_ok=True)

    audio_path = os.path.join(output_dir, f"{uuid.uuid4().hex}.wav")

    pipeline = KPipeline(lang_code='a')
    generator = pipeline(text, voice=voice, speed=1, split_pattern=r'\n+')

    for _, _, audio in generator:
        sf.write(audio_path, audio, 24000)
        break

    print(json.dumps({"audio_path": audio_path}))

if __name__ == "__main__":
    main()