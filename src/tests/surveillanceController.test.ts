import {SurveillanceControllerV1} from "../core/surveillanceControllerV1";
import {MotionSensor, VideoRecorder} from "../core/suveillanceInterfaces";

describe("Video Surveillance controller version 1 should", () => {
    it("ask the recorder to stop recording when the sensor detects no motion", () => {
        const motionSensorMock: MotionSensor = { isDetectingMotion: jest.fn().mockReturnValue(false) };
        const videoRecorderMock: VideoRecorder = {
            startRecording: jest.fn(),
            stopRecording: jest.fn(),
        };
        const controller = new SurveillanceControllerV1(motionSensorMock, videoRecorderMock);
        controller.recordMotion();
        expect(videoRecorderMock.stopRecording).toHaveBeenCalled();
        expect(videoRecorderMock.startRecording).not.toHaveBeenCalled();
    })
    it("ask the recorder to start recording when the sensor detects motion", () => {
        const motionSensorMock: MotionSensor = { isDetectingMotion: jest.fn().mockReturnValue(true) };
        const videoRecorderMock: VideoRecorder = {
            startRecording: jest.fn(),
            stopRecording: jest.fn(),
        };
        const controller = new SurveillanceControllerV1(motionSensorMock, videoRecorderMock);
        controller.recordMotion();
        expect(videoRecorderMock.startRecording).toHaveBeenCalled();
        expect(videoRecorderMock.stopRecording).not.toHaveBeenCalled();
    })
    it("ask the recorder to stop recording when the sensor throws an error", () => {
        const motionSensorMock: MotionSensor = {
            isDetectingMotion: jest.fn().mockImplementationOnce(() => {
                throw new Error("");
            })
        };
        const videoRecorderMock: VideoRecorder = {
            startRecording: jest.fn(),
            stopRecording: jest.fn(),
        };
        const controller = new SurveillanceControllerV1(motionSensorMock, videoRecorderMock);
        controller.recordMotion();
        expect(videoRecorderMock.stopRecording).toHaveBeenCalled();
        expect(videoRecorderMock.startRecording).not.toHaveBeenCalled();
    })
    it("ask the sensor to check every one second for any motion", () => {
        const motionSensorMock: MotionSensor = { isDetectingMotion: jest.fn().mockReturnValue(true) };
        const videoRecorderMock: VideoRecorder = {
            startRecording: jest.fn(),
            stopRecording: jest.fn(),
        };
        const controller = new SurveillanceControllerV1(motionSensorMock, videoRecorderMock);
        controller.recordMotion(3);
        expect(motionSensorMock.isDetectingMotion).toHaveBeenCalledTimes(3);
        expect(videoRecorderMock.startRecording).toHaveBeenCalledTimes(3);
        expect(videoRecorderMock.stopRecording).not.toHaveBeenCalled();
    })
})

describe("Video Surveillance controller version 2 should", () => {

})



