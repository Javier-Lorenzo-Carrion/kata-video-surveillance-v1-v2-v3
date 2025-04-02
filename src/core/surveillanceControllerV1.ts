import {MotionSensor, VideoRecorder} from "./suveillanceInterfaces";

export class SurveillanceControllerV1 {
    constructor(private motionSensor: MotionSensor, private videoRecorder: VideoRecorder) {
    }

    recordMotion(numberOfSeconds: number = 1) {
        for (let i: number = 1; i <= numberOfSeconds; i++) {
            try {
                !this.motionSensor.isDetectingMotion() ? this.videoRecorder.stopRecording() : this.videoRecorder.startRecording();
            } catch (error) {
                this.videoRecorder.stopRecording();
            }
        }
    }
}