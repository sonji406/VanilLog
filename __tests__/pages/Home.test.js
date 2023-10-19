import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Home from '@src/app/page';

jest.mock('@src/components/Posts/PostList', () => {
  return {
    __esModule: true,
    PostList: () => <div>Mocked Post List</div>,
  };
});

describe('<Home />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('포스트 리스트 컴포넌트가 정상적으로 렌더링되어야 한다.', async () => {
    await act(async () => {
      render(<Home />);
    });

    expect(screen.getByText('Mocked Post List')).toBeInTheDocument();
  });
});
