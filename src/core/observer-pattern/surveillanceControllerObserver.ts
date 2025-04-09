export interface MotionSensor {
    subscribe(observer: Observer);
    unsubscribe(observer: Observer);
    notify();
    isDetectingMotion(): boolean;
}

export interface Observer {
    update();
}

export interface VideoRecorder {
    startRecording(): void;
    stopRecording(): void;
}

export class SurveillanceControllerV3 implements Observer {
    constructor(private motionSensor: MotionSensor, private videoRecorder: VideoRecorder) {
        this.motionSensor.subscribe(this);
    }

    update() {
        try {
            if (this.motionSensor.isDetectingMotion()) {
                this.videoRecorder.startRecording();
            } else {
                this.videoRecorder.stopRecording();
            }
        }
        catch (error) {
            this.videoRecorder.stopRecording();
        }
    }
}