import { render, screen } from '@testing-library/react';
import BlogStatistics from '@src/components/Profile/BlogStatistics';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('<BlogStatistics />', () => {
  it('블로그 통계 방문자 수가 올바르게 렌더링 되어야 한다.', () => {
    render(<BlogStatistics />);

    expect(screen.getByText(/일일 방문자 수:/i)).toBeInTheDocument();

    expect(screen.getByText(/총 방문자 수:/i)).toBeInTheDocument();

    expect(screen.getByText(/반복 방문자 수:/i)).toBeInTheDocument();
  });
});
