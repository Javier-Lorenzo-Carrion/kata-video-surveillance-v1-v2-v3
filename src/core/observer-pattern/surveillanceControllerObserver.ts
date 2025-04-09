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

export class MotionSensorListener implements MotionSensor {
    private subscribers = [];
    private motionDetection: boolean = false;

    subscribe(observer: Observer) {
        this.subscribers.push(observer);
    }

    unsubscribe(observer: Observer) {
        this.subscribers.splice(this.subscribers.indexOf(observer), 1);
    }

    isDetectingMotion(): boolean {
        return this.motionDetection;
    }

    setMotionDetection(detectionResult: boolean) {
        this.motionDetection = detectionResult;
        this.notify();
    }

    notify() {
        for (let subscriber of this.subscribers) {
            subscriber.update();
        }
    }

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