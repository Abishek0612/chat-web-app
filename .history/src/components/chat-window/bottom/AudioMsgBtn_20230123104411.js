import { Alert, Icon, InputGroup } from "rsuite"
import { ReactMic } from 'react-mic';
import { useCallback, useState } from "react";
import { useParams } from "react-router";
import { storage } from "../../../misc/firebase";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const AudioMsgBtn = ({ afterUpload }) => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    if (!browserSupportsSpeechRecognition) {
         <span>Browser does not support speech recognition.</span>;
    }

    
    
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
                    .put(data.blob, {
                        cacheControl: `public , max-age=${3600 * 24 * 3}`,
                    })

                const file = {
                    contentType: snap.metadata.contentType,
                    name: snap.metadata.name,
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

            <InputGroup.Button color="blue" appearance="primary" onClick={onClick} disabled={isUploading} className={isRecording ? 'animate-blink' : ''} >
                <p>Speech: {listening ? 'on' : 'off'}</p>
                <button onClick={SpeechRecognition.startListening.record={isRecording}  }  >Start</button>
                <button onClick={SpeechRecognition.stopListening.onstop={onUpload}} >Stop</button>
                <button onClick={resetTranscript}>Reset</button>
                <p>{transcript}</p>
                <Icon icon='microphone' />
                <ReactMic
                    // record={isRecording}
                    // className="d-none"
                    // onStop={onUpload}
                    mimeType='audio/mp3' />
            </InputGroup.Button>
        )
    }

    export default AudioMsgBtn