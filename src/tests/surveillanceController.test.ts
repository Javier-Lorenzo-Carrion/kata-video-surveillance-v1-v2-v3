import {MotionSensor, SurveillanceController, VideoRecorder} from "../core/surveillanceController";

class FakeSensor implements MotionSensor {
    isDetectingMotion(): boolean {
        return false;
    }
}

class FakeRecorder implements VideoRecorder {
    startRecording() {
        console.log('Started recording');
    }
    stopRecording() {
        console.log("Recorder stopped");
    }
}

describe("Video Surveillance controller should", () => {
    it("ask the recorder to stop recording when the sensor detects no motion", ()=>{
        let called = false;
        const saveCall = () => {
            called = true;
        };

        const sensor = new FakeSensor();
        const recorder = new FakeRecorder();
        recorder.stopRecording = saveCall;
        const controller = new SurveillanceController(sensor, recorder);

        controller.recordMotion();

        expect(called).toBe(true);
    })
})



