import { VoiceRecorder } from './VoiceRecorder';
import { fireEvent, render, waitFor } from '@testing-library/react';
import * as useReactMediaRecorder from 'react-media-recorder';

const handleAudioRecordingMock = vi.fn();
const defaultProps = {
  handleAudioRecording: handleAudioRecordingMock,
  clearAudio: false,
  isMicActive: false,
};

afterEach(() => jest.restoreAllMocks());

const voiceRecorder = <VoiceRecorder {...defaultProps} />;

test('it renders correctly', () => {
  const mediaRecorder = jest.spyOn(useReactMediaRecorder, 'useReactMediaRecorder');
  mediaRecorder.mockImplementation(() => {
    return {
      status: 'idle',
    } as any;
  });
  const { getByTestId } = render(voiceRecorder);
  expect(getByTestId('recorder')).toBeInTheDocument();
});

test('check recording', async () => {
  const mediaRecorder = jest.spyOn(useReactMediaRecorder, 'useReactMediaRecorder');
  mediaRecorder.mockImplementation(() => {
    const onStop = vi.fn();
    const setStatus = vi.fn();

    return {
      status: 'idle',
      startRecording: () => {
        setStatus('recording');
      },
      stopRecording: () => {
        setStatus('stop');
        onStop();
      },
      mediaBlobUrl: 'blog://heythere',
      clearBlobUrl: vi.fn(),
    } as any;
  });
  const { getByTestId } = render(voiceRecorder);

  // start recording
  fireEvent.click(getByTestId('micIcon'));

  // stop recording
  fireEvent.click(getByTestId('recorder'));

  // still need to check stop recording
  await waitFor(() => {});

  // remove recording
  fireEvent.click(getByTestId('cancelIcon'));

  expect(handleAudioRecordingMock).toHaveBeenCalled();
});

// Todo: will come back to this after fixing all test cases

// test('permission denied', async () => {
//   const mediaRecorder = jest.spyOn(useReactMediaRecorder, 'useReactMediaRecorder');
//   mediaRecorder.mockImplementation(() => {
//     return {
//       error: 'permission_denied',
//     } as any;
//   });
//   const { getByTestId } = render(<VoiceRecorder {...defaultProps} />);
//   await waitFor(() => {
//     expect(getByTestId('micOffIcon')).toBeInTheDocument();
//   });
// });
