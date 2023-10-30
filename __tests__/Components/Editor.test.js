import React from 'react';
import { useRouter } from 'next/router';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { ERRORS } from 'constants/errors';
import Editor from '@src/components/Editor';
import EditorJS from '@editorjs/editorjs';
import axios from 'axios';

const setupEditorComponent = async (overrides = {}) => {
  const props = {
    author: 'testAuthorId',
    postId: 'testPostId',
    title: 'testTitle',
    content: {},
    error: null,
    setError: jest.fn(),
    isModify: false,
    ...overrides,
  };

  await act(async () => {
    render(<Editor {...props} />);
  });

  return props;
};

const clickSaveButton = async () => {
  const saveButton = screen.getByText('저장하기');
  await act(async () => {
    fireEvent.click(saveButton);
  });
};

const mockEditorJSInstance = {
  isReady: Promise.resolve(),
  render: jest.fn(),
  save: jest.fn().mockResolvedValue({
    blocks: [{ type: 'paragraph', data: { text: 'testDataContent' } }],
  }),
};

EditorJS.mockImplementation(() => mockEditorJSInstance);

describe('<Editor />', () => {
  it('Editor 컴포넌트 렌더링 후 포스트가 올바르게 저장되어야 한다.', async () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });

    axios.post.mockResolvedValue({ data: { status: 200 } });

    await setupEditorComponent();

    await clickSaveButton(screen);

    expect(mockEditorJSInstance.save).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalled();
  });

  it('제목을 입력하지 않고 "저장하기" 버튼을 눌렀을 때, 올바른 에러 메시지가 나타나야 한다.', async () => {
    const setErrorMock = jest.fn();

    await setupEditorComponent({
      title: '',
      setError: setErrorMock,
      content: {
        blocks: [{ type: 'paragraph', data: { text: 'Some content' } }],
      },
    });

    await clickSaveButton();

    expect(setErrorMock).toHaveBeenCalledWith(ERRORS.TITLE_CONTENT_REQUIRED);

    const error = ERRORS.TITLE_CONTENT_REQUIRED;
    render(<Editor error={error} />);

    expect(screen.getByText(ERRORS.TITLE_CONTENT_REQUIRED)).toBeInTheDocument();
  });

  it('본문을 입력하지 않고 "저장하기" 버튼을 눌렀을 때, 올바른 에러 메시지가 나타나야 한다.', async () => {
    const setErrorMock = jest.fn();

    mockEditorJSInstance.save.mockResolvedValueOnce({ blocks: [] });

    await setupEditorComponent({
      title: 'Some title',
      setError: setErrorMock,
      content: { blocks: [] },
    });

    await clickSaveButton();

    expect(setErrorMock).toHaveBeenCalledWith(ERRORS.TITLE_CONTENT_REQUIRED);

    const error = ERRORS.TITLE_CONTENT_REQUIRED;
    render(<Editor error={error} />);

    expect(screen.getByText(ERRORS.TITLE_CONTENT_REQUIRED)).toBeInTheDocument();
  });
});
