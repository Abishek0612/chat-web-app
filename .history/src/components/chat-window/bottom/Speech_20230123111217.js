import { useState } from 'react';
import { useParams } from 'react-router';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = () => {

    const { chatId } = useParams()
    
    const [isRecording, setIsRecording] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    
    const onClick = useCallback(() => {
        setIsRecording(p => !p);
    }, [])

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    
    if (!browserSupportsSpeechRecognition) {
        // eslint-disable-next-line react/no-unescaped-entities
        return <span>Browser doesn't support speech recognition.</span>;
    }
}
    
    const onUpload = useCallback(async (data) => {
        setIsUploading(true)
        try {
            const snap = await storage.ref(`/chat/${chatId}`)
                .child(`audio_${Date.now()}.mp3`)
                .put(data.blob, { cacheControl: `public , max-age=${3600 * 24 * 3}` ,
            })
          
            const file = {
                contentType: snap.metadata.contentType,
                name:snap.metadata.name,
                url: await snap.ref.getDownloadURL()
            };
            setIsUploading(false)
            afterUpload([file])

        } catch (error) {
            setIsUploading(false)
            Alert.error(error.message)
        }
    }, [afterUpload, chatId])

        
        return (
            <div>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
      </div>
    );
    export default Dictaphone