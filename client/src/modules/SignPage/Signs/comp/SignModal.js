import { useCallback, useRef, useState, useEffect } from "react";
import axios from "axios";

import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import { drawMesh } from "./meshUtilities.js";

import { Modal, Button } from "../../../../components";
import Webcam from "react-webcam";

const videoConstraints = {
    // aspectRatio: 0.6666666667,
    facingMode: "user",
};

const SignModal = ({ setShowModal }) => {
    const webcamRef = useRef(null);
    const canvasReference = useRef(null);
    const mediaRecoredRef = useRef(null);

    const [isClose, setIsClose] = useState(false);
    const [closeTimer, setCloseTimer] = useState(false);

    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [currentSign, setCurrentSign] = useState(null);

    const loadFacemesh = async () => {
        const network = await facemesh.load({
            inputResolution: { width: 480, height: 720 },
            scale: 0.8,
        });
        setInterval(() => {
            detectFace(network);
        }, 100);
    };

    useEffect(() => {
        let timeout = null;
        if (isClose) {
            timeout = setTimeout(() => {
                setCloseTimer(false);
            }, 500);
        } else {
            timeout = setTimeout(() => {
                setCloseTimer(true);
            }, 500);
        }

        return () => clearTimeout(timeout);
    }, [isClose]);

    const detectFace = async (network) => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            canvasReference.current.width = videoWidth;
            canvasReference.current.height = videoHeight;

            const faceEstimate = await network.estimateFaces(video);

            const ctx = canvasReference.current.getContext("2d");

            const [xBR, yBR] = [
                faceEstimate[0].boundingBox.bottomRight[0] - 30,
                faceEstimate[0].boundingBox.bottomRight[1] - 50,
            ];
            const [xTL, yTL] = [
                faceEstimate[0].boundingBox.topLeft[0] + 30,
                faceEstimate[0].boundingBox.topLeft[1] + 50,
            ];

            // 4 corners

            // ctx.beginPath();
            // ctx.arc(xBR, yBR, 5, 0, 3 * Math.PI);
            // ctx.fillStyle = "red";
            // ctx.fill();

            // ctx.beginPath();
            // ctx.arc(xTL, yTL, 5, 0, 3 * Math.PI);
            // ctx.fillStyle = "red";
            // ctx.fill();

            // ctx.beginPath();
            // ctx.arc(xBR, yTL, 5, 0, 3 * Math.PI);
            // ctx.fillStyle = "red";
            // ctx.fill();

            // ctx.beginPath();
            // ctx.arc(xTL, yBR, 5, 0, 3 * Math.PI);
            // ctx.fillStyle = "red";
            // ctx.fill();

            // 3 midpoints

            ctx.beginPath();
            ctx.arc((xBR + xTL) / 2, yTL, 5, 0, 3 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(xBR, (yBR + yTL) / 2, 5, 0, 3 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(xTL, (yBR + yTL) / 2, 5, 0, 3 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();

            // corner points

            ctx.beginPath();
            ctx.arc(videoWidth / 2, 50, 5, 0, 3 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(videoWidth / 2 + 130, 175, 5, 0, 3 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(videoWidth / 2 - 130, 175, 5, 0, 3 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();

            if (
                yTL - 50 <= 50.0 &&
                yTL - 50 >= -20.0 &&
                xBR <= 500.0 &&
                xBR >= 400.0 &&
                xTL <= 240.0 &&
                xTL >= 140.0
            ) {
                setIsClose(true);
            } else {
                setIsClose(false);
            }

            // drawMesh(faceEstimate, ctx);
        }
    };

    loadFacemesh();

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
            videoBitsPerSecond: 100000,
            mimeType: "video/webm",
        });
        mediaRecoredRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecoredRef.current.start();
        setTimeout(() => handleStopCaptureClick(), 5000);
    }, [webcamRef, setCapturing, mediaRecoredRef, handleDataAvailable]);

    const handleStopCaptureClick = useCallback(() => {
        mediaRecoredRef.current.stop();
        setCapturing(false);
        if (recordedChunks.length > 0) {
            handleDownload();
        }
    }, [mediaRecoredRef, setCapturing]);

    useEffect(() => {
        if (recordedChunks.length > 0 && !capturing) {
            handleDownload();
        }
    }, [recordedChunks, capturing]);

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

            if (result.status === 200) {
                setCurrentSign(result.data);
            }

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

    return (
        <Modal
            style={{ width: "50%" }}
            setShowModal={() => setShowModal(false)}
        >
            <div className="modal-main__el">
                <h1>Try to do this sign</h1>

                <div
                    style={{
                        display: "flex",
                    }}
                >
                    <iframe
                        src="https://drive.google.com/file/d/14CfPyyTlHNHkcmNeD7WD5MijegbQFAb3/preview"
                        width="400"
                        height="300"
                        allow="autoplay"
                        allowfullscreen
                    ></iframe>
                    <div className="modal-main__el__webcam">
                        <Webcam
                            mirrored
                            ref={webcamRef}
                            style={{ height: "300px", width: "400px" }}
                        />

                        {closeTimer && (
                            <img
                                src={
                                    isClose
                                        ? "/imgs/green_user.png"
                                        : "/imgs/red_user.png"
                                }
                                alt="test"
                                style={{
                                    position: "absolute",
                                    zindex: 10,
                                    width: 400,
                                    height: 300,
                                }}
                            />
                        )}

                        <canvas
                            ref={canvasReference}
                            style={{
                                position: "absolute",
                                zindex: 9,
                                width: 400,
                                height: 300,
                                transform: "scale(-1, 1)",
                            }}
                        />
                    </div>
                </div>

                {currentSign && <>{currentSign}</>}

                {!capturing ? (
                    <Button
                        text="Старт"
                        style={{ width: "20%" }}
                        action={handleStartCaptureClick}
                    />
                ) : (
                    <>Запись</>
                )}
            </div>
        </Modal>
    );
};

export default SignModal;
