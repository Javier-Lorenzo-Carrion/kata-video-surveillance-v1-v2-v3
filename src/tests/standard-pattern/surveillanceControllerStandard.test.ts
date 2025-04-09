import {
    MotionSensor,
    SurveillanceControllerV1,
    SurveillanceControllerV2,
    VideoRecorder
} from "../../core/standard-pattern/surveillanceControllerStandard";

describe("Video Surveillance controller version 1 should", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.useRealTimers()
    });
    it("ask the recorder to stop recording when the sensor detects no motion", () => {
        const motionSensorMock: MotionSensor = {isDetectingMotion: jest.fn().mockReturnValue(false)};
        const videoRecorderMock: VideoRecorder = {startRecording: jest.fn(), stopRecording: jest.fn()};
        const controller = new SurveillanceControllerV1(motionSensorMock, videoRecorderMock);
        controller.recordMotionV1(1);
        jest.advanceTimersByTime(1000);
        expect(videoRecorderMock.stopRecording).toHaveBeenCalled();
        expect(videoRecorderMock.startRecording).not.toHaveBeenCalled();
    })
    it("ask the recorder to start recording when the sensor detects motion", () => {
        const motionSensorMock: MotionSensor = {isDetectingMotion: jest.fn().mockReturnValue(true)};
        const videoRecorderMock: VideoRecorder = {startRecording: jest.fn(), stopRecording: jest.fn()};
        const controller = new SurveillanceControllerV1(motionSensorMock, videoRecorderMock);
        controller.recordMotionV1(1);
        jest.advanceTimersByTime(1000);
        expect(videoRecorderMock.startRecording).toHaveBeenCalled();
        expect(videoRecorderMock.stopRecording).not.toHaveBeenCalled();
    })
    it("ask the recorder to stop recording when the sensor throws an error", () => {
        const motionSensorMock: MotionSensor = {isDetectingMotion: jest.fn().mockImplementationOnce(() => {throw new Error("Unexpected error");})};
        const videoRecorderMock: VideoRecorder = {startRecording: jest.fn(), stopRecording: jest.fn()};
        const controller = new SurveillanceControllerV1(motionSensorMock, videoRecorderMock);
        controller.recordMotionV1(1);
        jest.advanceTimersByTime(1000);
        expect(videoRecorderMock.stopRecording).toHaveBeenCalled();
        expect(videoRecorderMock.startRecording).not.toHaveBeenCalled();
    })
    it("ask the sensor to check every one second for any motion", () => {
        //const motionSensorMock: MotionSensor = {isDetectingMotion: jest.fn().mockReturnValue(true)};
        const motionSensorMock: MotionSensor = {isDetectingMotion: jest.fn()
                .mockImplementationOnce(() => true)
                .mockImplementationOnce(() => false)
                .mockImplementationOnce(() => true)
        }
        const videoRecorderMock: VideoRecorder = {startRecording: jest.fn(), stopRecording: jest.fn()};
        const controller = new SurveillanceControllerV1(motionSensorMock, videoRecorderMock);
        controller.recordMotionV1(3);
        jest.advanceTimersByTime(3000);
        expect(motionSensorMock.isDetectingMotion).toHaveBeenCalledTimes(3);
        expect(videoRecorderMock.startRecording).toHaveBeenCalledTimes(2);
        expect(videoRecorderMock.stopRecording).toHaveBeenCalledTimes(1);
    })
})

describe("Video Surveillance controller version 2 should", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.useRealTimers()
    });
    it("ask the recorder to stop recording when the sensor detects no motion", () => {
        const motionSensorMock: MotionSensor = {isDetectingMotion: jest.fn().mockReturnValue(false)};
        const videoRecorderMock: VideoRecorder = {startRecording: jest.fn(), stopRecording: jest.fn()};
        const controller = new SurveillanceControllerV2(motionSensorMock, videoRecorderMock);
        controller.recordMotionV2(1);
        jest.advanceTimersByTime(1000);
        expect(videoRecorderMock.stopRecording).toHaveBeenCalled();
        expect(videoRecorderMock.startRecording).not.toHaveBeenCalled();
    })
    it("ask the recorder to start recording when the sensor detects motion", () => {
        const motionSensorMock: MotionSensor = {isDetectingMotion: jest.fn().mockReturnValue(true)};
        const videoRecorderMock: VideoRecorder = {startRecording: jest.fn(), stopRecording: jest.fn()};
        const controller = new SurveillanceControllerV2(motionSensorMock, videoRecorderMock);
        controller.recordMotionV2(1);
        jest.advanceTimersByTime(1000);
        expect(videoRecorderMock.startRecording).toHaveBeenCalled();
        expect(videoRecorderMock.stopRecording).not.toHaveBeenCalled();
    })
    it("ask the recorder to stop recording when the sensor throws an error", () => {
        const motionSensorMock: MotionSensor = {isDetectingMotion: jest.fn().mockImplementationOnce(() => {throw new Error("");})};
        const videoRecorderMock: VideoRecorder = {startRecording: jest.fn(), stopRecording: jest.fn()};
        const controller = new SurveillanceControllerV2(motionSensorMock, videoRecorderMock);
        controller.recordMotionV2(1);
        jest.advanceTimersByTime(1000);
        expect(videoRecorderMock.stopRecording).toHaveBeenCalled();
        expect(videoRecorderMock.startRecording).not.toHaveBeenCalled();
    })
    it("ask the sensor to check every one second for any motion", () => {
        const motionSensorMock: MotionSensor = {isDetectingMotion: jest.fn().mockReturnValue(true)};
        const videoRecorderMock: VideoRecorder = {startRecording: jest.fn(), stopRecording: jest.fn()};
        const controller = new SurveillanceControllerV2(motionSensorMock, videoRecorderMock);
        controller.recordMotionV2(3);
        jest.advanceTimersByTime(1000);
        jest.advanceTimersByTime(1000);
        jest.advanceTimersByTime(1000);
        expect(motionSensorMock.isDetectingMotion).toHaveBeenCalledTimes(3);
        expect(videoRecorderMock.startRecording).toHaveBeenCalledTimes(3);
        expect(videoRecorderMock.stopRecording).not.toHaveBeenCalled();
    })
})


