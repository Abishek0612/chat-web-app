import { useCallback, useState } from 'react';
import { ReactMic } from 'react-mic';
import { useParams } from 'react-router';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Alert, Icon, InputGroup } from 'rsuite';
import { storage } from '../../../misc/firebase';

const Dictaphone = ({ afterUpload }) => {

    const { chatId } = useParams()

    const [isRecording, setIsRecording] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const onClick = useCallback(() => {
        setIsRecording(p => !p);
    }, [])

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
        <InputGroup.Button color="blue" appearance="primary" onClick={onClick} disabled={isUploading} className={isRecording ? 'animate-blink' : ''} >
        <Icon icon='microphone' />
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <ReactMic
                record={isRecording}
                className="d-none"
                onStop={onUpload}
                mimeType='audio/mp3' />
            <button onClick={SpeechRecognition.startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
        </InputGroup.Button>
        </div>
    );
};
export default Dictaphone;