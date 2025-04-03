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

export class SurveillanceControllerV2 {
    constructor(private motionSensor: MotionSensor, private videoRecorder: VideoRecorder) {
    }

    // setTimeOut away/async
    // Usando biblioteca RxJs
    record(secondsToRecord: number): void {

    }

}