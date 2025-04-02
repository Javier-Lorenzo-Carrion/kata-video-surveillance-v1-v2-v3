import {MotionSensor, VideoRecorder} from "./surveillanceInterfaces";

export class SurveillanceControllerV1 {
    constructor(private motionSensor: MotionSensor, private videoRecorder: VideoRecorder) {
    }

    recordMotion(numberOfSeconds: number) {
        let elapsedSeconds: number = 0;
        const interval = setInterval(() => {
            try {
                this.motionSensor.isDetectingMotion() ? this.videoRecorder.startRecording() : this.videoRecorder.stopRecording();
            } catch (error) {
                this.videoRecorder.stopRecording();
            }
            elapsedSeconds++;
            if(elapsedSeconds >= numberOfSeconds) clearInterval(interval);
        }, 1000);
    }
}