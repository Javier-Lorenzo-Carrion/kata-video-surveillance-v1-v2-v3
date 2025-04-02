import {SurveillanceControllerV1} from "../core/surveillanceControllerV1";
import SpyInstance = jest.SpyInstance;
import {MotionSensor, VideoRecorder} from "../core/suveillanceInterfaces";

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

describe("Video Surveillance controller version 1 should", () => {
    let sensor: FakeSensor;
    let recorder: FakeRecorder;
    let controller: SurveillanceControllerV1;
    let stubSensor: SpyInstance, spyRecorderOnStart: SpyInstance, spyRecorderOnStop: SpyInstance;
    beforeEach(() => {
        sensor = new FakeSensor();
        recorder = new FakeRecorder();
        controller = new SurveillanceControllerV1(sensor, recorder);
        stubSensor = jest.spyOn(sensor, "isDetectingMotion");
        spyRecorderOnStart = jest.spyOn(recorder, "startRecording");
        spyRecorderOnStop = jest.spyOn(recorder, "stopRecording");
    })
    it("ask the recorder to stop recording when the sensor detects no motion", () => {
        stubSensor.mockImplementationOnce(() => false);
        controller.recordMotion();
        expect(spyRecorderOnStop).toHaveBeenCalled();
    })
    it("ask the recorder to start recording when the sensor detects motion", () => {
        stubSensor.mockImplementationOnce(() => true);
        controller.recordMotion();
        expect(spyRecorderOnStart).toHaveBeenCalled();
    })
    it("ask the recorder to stop recording when the sensor throws an error", () => {
        stubSensor.mockImplementationOnce(() => {
            throw new Error("Error");
        });
        controller.recordMotion();
        expect(spyRecorderOnStop).toHaveBeenCalled();
    })
})

describe("Video Surveillance controller version 2 should", () => {

})



