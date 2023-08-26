import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import PostEditPage from '@src/app/post/editor/[userId]/page';
import axios from 'axios';

jest.mock('@src/components/Editor', () => {
  return function MockedEditor() {
    return <div>Mocked Editor</div>;
  };
});

describe('<PostEditPage />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('포스트 수정 모드에서 올바르게 렌더링 및 상태 변경이 되어야 한다', async () => {
    const mockResponse = {
      data: {
        status: 'success',
        data: {
          title: 'Mocked Title',
          content: 'Mocked Content',
        },
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const mockParams = ['1', '1'];

    await act(async () => {
      render(<PostEditPage params={mockParams} />);
    });

    expect(screen.getByDisplayValue('Mocked Title')).toBeInTheDocument();
    expect(screen.getByText('Mocked Editor')).toBeInTheDocument();

    const titleInput = screen.getByDisplayValue('Mocked Title');
    fireEvent.change(titleInput, { target: { value: 'New Mocked Title' } });

    expect(titleInput.value).toBe('New Mocked Title');
  });
});
