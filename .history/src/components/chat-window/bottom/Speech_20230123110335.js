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

    const onUpload = useCallback(async (data) => {
        setIsUploading(true)
        
          

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
  



    return (
      <div>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
      </div>
    );
  export default Dictaphone;