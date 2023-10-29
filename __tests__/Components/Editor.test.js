import React from 'react';
import { useRouter } from 'next/router';
import { render, screen, act, fireEvent } from '@testing-library/react';
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

const clickSaveButton = async (screen) => {
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

    axios.post.mockResolvedValue({ data: { status: 'success' } });

    await setupEditorComponent();

    await clickSaveButton(screen);

    expect(mockEditorJSInstance.save).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalled();
  });
});
