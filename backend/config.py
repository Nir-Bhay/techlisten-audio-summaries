import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # API Keys
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    ELEVENLABS_API_KEY = os.getenv('ELEVENLABS_API_KEY')
    
    # TTS Provider (elevenlabs, browser, aws, azure)
    TTS_PROVIDER = os.getenv('TTS_PROVIDER', 'elevenlabs')
    
    # Audio settings
    AUDIO_UPLOAD_FOLDER = 'audio_files'
    MAX_TEXT_LENGTH = 10000
    
    # ElevenLabs settings
    ELEVENLABS_VOICE_ID = "21m00Tcm4TlvDq8ikWAM"  # Rachel (default)
    ELEVENLABS_MODEL = "eleven_monolingual_v1"