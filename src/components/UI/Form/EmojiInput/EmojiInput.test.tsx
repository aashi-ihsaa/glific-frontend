import { render } from '@testing-library/react';
import { EmojiInput } from './EmojiInput';
import { EditorState } from 'draft-js';

const setFieldValueMock = vi.fn();

const wrapper = (
  <EmojiInput
    form={{
      touched: false,
      errors: {},
      values: { input: EditorState.createEmpty() },
      setFieldValue: setFieldValueMock,
    }}
    field={{ name: 'input', value: EditorState.createEmpty(), onChange: vi.fn() }}
    label="Title"
    placeholder="Title"
    rows={10}
  />
);
it('renders <EmojiInput /> component', () => {
  const { getByTestId } = render(wrapper);
  expect(getByTestId('input')).toBeInTheDocument();
});

it('should have a emoji picker', () => {
  const { getByTestId } = render(wrapper);
  expect(getByTestId('emoji-picker')).toBeInTheDocument();
});

// since we are mocking emoji-picker we need to implement the following functionalities

// test('clicking on emoji picker should open a container to select emojis', async () => {
//   const user = userEvent.setup();
//   const { getByTestId, container } = render(wrapper);
//   await user.click(getByTestId('emoji-picker'));
//   expect(container.querySelector('.emoji-mart')).toBeInTheDocument();
// });

// test('clicking on an emoji should call onChange function', () => {
//   const { getByTestId, container } = render(wrapper);
//   fireEvent.click(getByTestId('emoji-picker'));
//   fireEvent.click(container.querySelector('.emoji-mart-emoji') as Element);
//   expect(setFieldValueMock).toBeCalled();
// });
