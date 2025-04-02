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
        if(!this.sensor.isDetectingMotion()){
            this.recorder.stopRecording();
        } else {
            this.recorder.startRecording();
        }
    }
}