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
    let sensor: FakeSensor;
    let recorder: FakeRecorder;
    let controller: SurveillanceController;
    beforeEach(() => {
        sensor = new FakeSensor();
        recorder = new FakeRecorder();
        controller = new SurveillanceController(sensor, recorder);
    })
    it("ask the recorder to stop recording when the sensor detects no motion", ()=>{
        const spyRecorder = jest.spyOn(recorder, "stopRecording");
        controller.recordMotion();
        expect(spyRecorder).toHaveBeenCalled();
    })
})



