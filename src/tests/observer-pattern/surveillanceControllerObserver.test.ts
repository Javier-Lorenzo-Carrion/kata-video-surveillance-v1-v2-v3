import {
    MotionSensor,
    SurveillanceControllerV3,
    VideoRecorder
} from "../../core/observer-pattern/surveillanceControllerObserver";

describe("Video Surveillance controller version 3 should", () => {
    it("ask the recorder to stop recording when the sensor detects no motion", () => {
        const motionSensorMock: MotionSensor = {
            subscribe: jest.fn(),
            unsubscribe: jest.fn(),
            isDetectingMotion: jest.fn().mockReturnValue(false),
            notify(){}
        }
        const videoRecorderMock: VideoRecorder = {startRecording: jest.fn(), stopRecording: jest.fn()};
        const controller = new SurveillanceControllerV3(motionSensorMock, videoRecorderMock);
        controller.update();
        expect(videoRecorderMock.stopRecording).toHaveBeenCalled();
        expect(videoRecorderMock.startRecording).not.toHaveBeenCalled();
    })
})