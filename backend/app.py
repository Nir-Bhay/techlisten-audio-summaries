from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import openai
import os
import hashlib
import time
import requests
import json
from config import Config

app = Flask(__name__)
CORS(app)

# Configure OpenAI
openai.api_key = Config.OPENAI_API_KEY

# Simple in-memory cache
cache = {}

def create_audio_folder():
    if not os.path.exists(Config.AUDIO_UPLOAD_FOLDER):
        os.makedirs(Config.AUDIO_UPLOAD_FOLDER)

def generate_cache_key(text):
    return hashlib.md5(text[:200].encode()).hexdigest()

def summarize_with_openai(text):
    try:
        prompt = f"""
        Please summarize this tech article in 2-3 clear, conversational sentences. 
        Make it sound natural when spoken aloud. Focus on:
        1. What happened or was announced
        2. Why it's important or interesting
        3. Key takeaway for tech professionals
        
        Article text:
        {text[:3000]}
        
        Summary:
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a tech news summarizer. Create concise, audio-friendly summaries."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=200,
            temperature=0.7
        )
        
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"OpenAI error: {e}")
        return fallback_summarize(text)

def fallback_summarize(text):
    """Simple extractive summarization as fallback"""
    sentences = text.split('. ')
    
    if len(sentences) >= 3:
        summary = sentences[0] + '. ' + sentences[1] + '. ' + sentences[-1]
    else:
        summary = '. '.join(sentences)
    
    return summary[:400] + '...' if len(summary) > 400 else summary

# =============================================
# TTS PROVIDERS
# =============================================

def elevenlabs_tts(text, cache_key):
    """ElevenLabs TTS - Premium quality"""
    try:
        url = f"https://api.elevenlabs.io/v1/text-to-speech/{Config.ELEVENLABS_VOICE_ID}"
        
        headers = {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": Config.ELEVENLABS_API_KEY
        }
        
        data = {
            "text": text,
            "model_id": Config.ELEVENLABS_MODEL,
            "voice_settings": {
                "stability": 0.5,
                "similarity_boost": 0.5,
                "style": 0.0,
                "use_speaker_boost": True
            }
        }
        
        response = requests.post(url, json=data, headers=headers)
        
        if response.status_code == 200:
            audio_filename = f"{cache_key}_elevenlabs.mp3"
            audio_path = os.path.join(Config.AUDIO_UPLOAD_FOLDER, audio_filename)
            
            with open(audio_path, 'wb') as f:
                f.write(response.content)
            
            return audio_filename
        else:
            print(f"ElevenLabs error: {response.status_code} - {response.text}")
            return None
            
    except Exception as e:
        print(f"ElevenLabs TTS error: {e}")
        return None

def aws_polly_tts(text, cache_key):
    """AWS Polly TTS - Good quality, pay-per-use"""
    try:
        import boto3
        
        polly = boto3.client('polly',
            aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
            region_name='us-west-2'
        )
        
        response = polly.synthesize_speech(
            Text=text,
            OutputFormat='mp3',
            VoiceId='Joanna',  # Natural female voice
            Engine='neural'
        )
        
        audio_filename = f"{cache_key}_polly.mp3"
        audio_path = os.path.join(Config.AUDIO_UPLOAD_FOLDER, audio_filename)
        
        with open(audio_path, 'wb') as f:
            f.write(response['AudioStream'].read())
        
        return audio_filename
        
    except Exception as e:
        print(f"AWS Polly error: {e}")
        return None

def azure_tts(text, cache_key):
    """Azure Cognitive Services TTS"""
    try:
        import azure.cognitiveservices.speech as speechsdk
        
        speech_key = os.getenv('AZURE_SPEECH_KEY')
        service_region = os.getenv('AZURE_SPEECH_REGION', 'eastus')
        
        speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)
        speech_config.speech_synthesis_voice_name = "en-US-JennyNeural"
        
        audio_filename = f"{cache_key}_azure.wav"
        audio_path = os.path.join(Config.AUDIO_UPLOAD_FOLDER, audio_filename)
        
        audio_config = speechsdk.audio.AudioOutputConfig(filename=audio_path)
        synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)
        
        result = synthesizer.speak_text_async(text).get()
        
        if result.reason == speechsdk.ResultReason.SynthesizingSpeechCompleted:
            return audio_filename
        else:
            return None
            
    except Exception as e:
        print(f"Azure TTS error: {e}")
        return None

def browser_tts(text, cache_key):
    """Browser TTS - Free but client-side"""
    return f"tts:{text}"

def openai_tts(text, cache_key):
    """OpenAI TTS - New and good quality"""
    try:
        response = openai.Audio.create(
            model="tts-1",
            voice="alloy",  # or nova, echo, fable, onyx, shimmer
            input=text
        )
        
        audio_filename = f"{cache_key}_openai.mp3"
        audio_path = os.path.join(Config.AUDIO_UPLOAD_FOLDER, audio_filename)
        
        response.stream_to_file(audio_path)
        return audio_filename
        
    except Exception as e:
        print(f"OpenAI TTS error: {e}")
        return None

# =============================================
# TTS PROVIDER SELECTOR
# =============================================

def generate_speech(text, cache_key):
    """Generate speech using configured provider with fallbacks"""
    
    providers = {
        'elevenlabs': elevenlabs_tts,
        'openai': openai_tts,
        'aws': aws_polly_tts,
        'azure': azure_tts,
        'browser': browser_tts
    }
    
    # Try primary provider
    primary_provider = Config.TTS_PROVIDER
    if primary_provider in providers:
        print(f"Trying {primary_provider} TTS...")
        result = providers[primary_provider](text, cache_key)
        if result:
            return result, primary_provider
    
    # Fallback sequence
    fallback_order = ['openai', 'elevenlabs', 'browser']
    
    for provider_name in fallback_order:
        if provider_name != primary_provider and provider_name in providers:
            print(f"Falling back to {provider_name} TTS...")
            result = providers[provider_name](text, cache_key)
            if result:
                return result, provider_name
    
    return None, None

# =============================================
# API ENDPOINTS
# =============================================

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy", 
        "tts_provider": Config.TTS_PROVIDER,
        "message": "TechListen API is running"
    })

@app.route('/voices', methods=['GET'])
def get_available_voices():
    """Get available voices for ElevenLabs"""
    if Config.TTS_PROVIDER == 'elevenlabs' and Config.ELEVENLABS_API_KEY:
        try:
            url = "https://api.elevenlabs.io/v1/voices"
            headers = {"xi-api-key": Config.ELEVENLABS_API_KEY}
            
            response = requests.get(url, headers=headers)
            if response.status_code == 200:
                voices = response.json()
                return jsonify({"success": True, "voices": voices})
        except Exception as e:
            pass
    
    return jsonify({"success": False, "message": "Voices not available"})

@app.route('/process-article', methods=['POST'])
def process_article():
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({"success": False, "error": "No text provided"})
        
        article_text = data['text'].strip()
        
        if len(article_text) < 100:
            return jsonify({"success": False, "error": "Article too short"})
        
        if len(article_text) > Config.MAX_TEXT_LENGTH:
            article_text = article_text[:Config.MAX_TEXT_LENGTH]
        
        # Generate cache key
        cache_key = generate_cache_key(article_text)
        
        # Check cache first
        if cache_key in cache:
            cached_result = cache[cache_key]
            return jsonify({
                "success": True,
                "summary": cached_result['summary'],
                "audio_url": f"/audio/{cached_result['audio_filename']}" if not cached_result['audio_filename'].startswith('tts:') else cached_result['audio_filename'],
                "provider": cached_result.get('provider', 'unknown'),
                "cached": True
            })
        
        # Generate summary
        summary = summarize_with_openai(article_text)
        
        # Generate audio
        audio_filename, provider = generate_speech(summary, cache_key)
        
        if not audio_filename:
            return jsonify({"success": False, "error": "Failed to generate audio"})
        
        # Cache the result
        cache[cache_key] = {
            'summary': summary,
            'audio_filename': audio_filename,
            'provider': provider,
            'timestamp': time.time()
        }
        
        # Prepare response
        audio_url = f"/audio/{audio_filename}" if not audio_filename.startswith('tts:') else audio_filename
        
        return jsonify({
            "success": True,
            "summary": summary,
            "audio_url": audio_url,
            "provider": provider,
            "cached": False
        })
        
    except Exception as e:
        print(f"Process error: {e}")
        return jsonify({"success": False, "error": "Internal server error"})

@app.route('/audio/<filename>', methods=['GET'])
def serve_audio(filename):
    try:
        audio_path = os.path.join(Config.AUDIO_UPLOAD_FOLDER, filename)
        if os.path.exists(audio_path):
            return send_file(audio_path, mimetype='audio/mpeg')
        else:
            return jsonify({"error": "Audio file not found"}), 404
    except Exception as e:
        print(f"Audio serve error: {e}")
        return jsonify({"error": "Failed to serve audio"}), 500

if __name__ == '__main__':
    create_audio_folder()
    print("🚀 TechListen API starting...")
    print("📁 Audio folder created")
    print("🔑 Checking API keys...")
    
    if not Config.OPENAI_API_KEY:
        print("❌ OpenAI API key not found!")
    else:
        print("✅ OpenAI API key loaded")
    
    if Config.TTS_PROVIDER == 'elevenlabs':
        if not Config.ELEVENLABS_API_KEY:
            print("❌ ElevenLabs API key not found!")
        else:
            print("✅ ElevenLabs API key loaded")
    
    print(f"🎤 TTS Provider: {Config.TTS_PROVIDER}")
    
    app.run(debug=True, port=5000)