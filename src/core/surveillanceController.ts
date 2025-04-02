export interface MotionSensor {
    isDetectingMotion(): boolean;
}

export interface VideoRecorder {
    startRecording(): void;
    stopRecording(): void;
}

export class SurveillanceController {
    constructor(private sensor: MotionSensor, private recorder: VideoRecorder) {}
    recordMotion(){
        try {
            !this.sensor.isDetectingMotion()? this.recorder.stopRecording() : this.recorder.startRecording();
        } catch (error) {
            this.recorder.stopRecording();
        }
    }
}