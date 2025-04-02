import {MotionSensor, VideoRecorder} from "./suveillanceInterfaces";

export class SurveillanceControllerV1 {
    constructor(private motionSensor: MotionSensor, private videoRecorder: VideoRecorder) {
    }

    recordMotion() {
        try {
            !this.motionSensor.isDetectingMotion() ? this.videoRecorder.stopRecording() : this.videoRecorder.startRecording();
        } catch (error) {
            this.videoRecorder.stopRecording();
        }
    }
}