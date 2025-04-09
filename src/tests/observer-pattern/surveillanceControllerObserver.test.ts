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
    it("ask the recorder to start recording when the sensor detects motion", () => {
        const motionSensorMock: MotionSensor = {
            subscribe: jest.fn(),
            unsubscribe: jest.fn(),
            isDetectingMotion: jest.fn().mockReturnValue(true),
            notify(){}
        }
        const videoRecorderMock: VideoRecorder = {startRecording: jest.fn(), stopRecording: jest.fn()};
        const controller = new SurveillanceControllerV3(motionSensorMock, videoRecorderMock);
        controller.update();
        expect(videoRecorderMock.startRecording).toHaveBeenCalled();
        expect(videoRecorderMock.stopRecording).not.toHaveBeenCalled();
    })
    it("ask the recorder to stop recording when the sensor throws an error", () => {
        const motionSensorMock: MotionSensor = {
            subscribe: jest.fn(),
            unsubscribe: jest.fn(),
            isDetectingMotion: jest.fn().mockImplementationOnce(() => {throw new Error("Unexpected error")}),
            notify(){}
        }
        const videoRecorderMock: VideoRecorder = {startRecording: jest.fn(), stopRecording: jest.fn()};
        const controller = new SurveillanceControllerV3(motionSensorMock, videoRecorderMock);
        controller.update();
        expect(videoRecorderMock.stopRecording).toHaveBeenCalled();
        expect(videoRecorderMock.startRecording).not.toHaveBeenCalled();
    })
    it("subscribe to the sensor", () => {
        const motionSensorMock: MotionSensor = {
            subscribe: jest.fn(),
            unsubscribe: jest.fn(),
            isDetectingMotion: jest.fn(),
            notify(){}
        }
        const videoRecorderMock: VideoRecorder = {startRecording: jest.fn(), stopRecording: jest.fn()};
        const controller = new SurveillanceControllerV3(motionSensorMock, videoRecorderMock);
        expect(motionSensorMock.subscribe).toBeCalledWith(controller);
    })
})