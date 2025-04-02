import {MotionSensor, VideoRecorder} from "./suveillanceInterfaces";

export class SurveillanceControllerV1 {
    constructor(private sensor: MotionSensor, private recorder: VideoRecorder) {
    }

    recordMotion() {
        try {
            !this.sensor.isDetectingMotion() ? this.recorder.stopRecording() : this.recorder.startRecording();
        } catch (error) {
            this.recorder.stopRecording();
        }
    }
}