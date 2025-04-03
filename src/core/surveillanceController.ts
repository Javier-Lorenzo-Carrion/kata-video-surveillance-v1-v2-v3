export interface MotionSensor {
    isDetectingMotion(): boolean;
}

export interface VideoRecorder {
    startRecording(): void;
    stopRecording(): void;
}

export class SurveillanceControllerV1 {
    constructor(private motionSensor: MotionSensor, private videoRecorder: VideoRecorder) {
    }

    recordMotionV1(numberOfSeconds: number) {
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

export class SurveillanceControllerV2 {
    constructor(private motionSensor: MotionSensor, private videoRecorder: VideoRecorder) {
    }

    recordMotionV2() {
        try {
            switch (this.motionSensor.isDetectingMotion()) {
                case false: this.videoRecorder.stopRecording(); break;
                case true: this.videoRecorder.startRecording(); break;
            }
        } catch (error) {
            this.videoRecorder.stopRecording();
        }
    }
}