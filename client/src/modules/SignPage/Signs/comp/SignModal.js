import { useCallback, useRef, useState } from "react";
import axios from "axios";

import { Modal, Button } from "../../../../components";
import Webcam from "react-webcam";

const videoConstraints = {
    width: { min: 480 },
    height: { min: 720 },
    // aspectRatio: 0.6666666667,
    facingMode: "user",
};

const SignModal = ({ setShowModal }) => {
    const webcamRef = useRef(null);
    const mediaRecoredRef = useRef(null);

    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    console.log(recordedChunks);

    const handleDataAvailable = useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStartCaptureClick = useCallback(() => {
        setCapturing(true);
        mediaRecoredRef.current = new MediaRecorder(webcamRef.current.stream, {
            videoBitsPerSecond: 2500000,
            mimeType: "video/webm",
        });
        mediaRecoredRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecoredRef.current.start();
    }, [webcamRef, setCapturing, mediaRecoredRef, handleDataAvailable]);

    const handleStopCaptureClick = useCallback(() => {
        mediaRecoredRef.current.stop();
        setCapturing(false);
    }, [mediaRecoredRef, setCapturing]);

    const handleDownload = useCallback(async () => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm",
            });

            const fd = new FormData();
            fd.append("file", blob);

            console.log(fd);

            const result = await axios.post("http://127.0.0.1:5000/", fd, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(result);

            // const url = URL.createObjectURL(blob);
            // const a = document.createElement("a");
            // document.body.appendChild(a);
            // a.style = "display: none";
            // a.href = url;
            // a.download = "react-webcam-stream-capture.mp4";
            // a.click();
            // window.URL.revokeObjectURL(url);
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    console.log(capturing);

    return (
        <Modal
            style={{ width: "50%" }}
            setShowModal={() => setShowModal(false)}
        >
            <div className="modal-main__el">
                <div>
                    <iframe
                        src="https://drive.google.com/file/d/14CfPyyTlHNHkcmNeD7WD5MijegbQFAb3/preview"
                        width="340"
                        height="250"
                        allow="autoplay"
                        allowfullscreen
                    ></iframe>
                    <Webcam
                        mirrored
                        width="340"
                        height="255"
                        videoConstraints={videoConstraints}
                        ref={webcamRef}
                    />
                </div>

                {capturing ? (
                    <Button
                        text="Стоп"
                        style={{ width: "20%" }}
                        action={handleStopCaptureClick}
                    />
                ) : (
                    <>
                        <Button
                            text="Старт"
                            style={{ width: "20%" }}
                            action={handleStartCaptureClick}
                        />
                        {recordedChunks.length > 0 && (
                            <Button
                                text="Скачать"
                                action={handleDownload}
                                style={{ width: "20%" }}
                            />
                        )}
                    </>
                )}
            </div>
        </Modal>
    );
};

export default SignModal;
