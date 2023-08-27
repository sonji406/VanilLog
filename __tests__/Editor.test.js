import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import Editor from '@src/components/Editor';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import EditorJS from '@editorjs/editorjs';

describe('Editor', () => {
  it('Editor 컴포넌트 렌더링 및 포스트 저장을 처리해야 한다.', async () => {
    useRouter.mockReturnValue({
      push: jest.fn(),
    });

    axios.post.mockResolvedValue({
      data: {
        status: 'success',
      },
    });

    const mockEditorJSInstance = {
      isReady: Promise.resolve(),
      render: jest.fn(),
      save: jest.fn().mockResolvedValue({
        blocks: [{ type: 'paragraph', data: { text: '본문 내용' } }],
      }),
    };

    EditorJS.mockImplementation(() => mockEditorJSInstance);

    await act(async () => {
      render(
        <Editor
          author='작성자Id'
          postId='포스트Id'
          title='제목'
          content={{}}
          error={null}
          setError={jest.fn()}
          isModify={false}
        />,
      );
    });

    const saveButton = screen.getByText('Save');

    await act(async () => {
      fireEvent.click(saveButton);
    });

    expect(mockEditorJSInstance.save).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalled();
  });
});
