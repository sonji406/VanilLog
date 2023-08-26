import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import NicknameEditor from '@src/components/Profile/NicknameEditor';

describe('<NicknameEditor />', () => {
  it('기본 상태에서 닉네임이 올바르게 렌더링되어야 한다.', () => {
    const mockNickname = '햄스터';

    render(
      <NicknameEditor
        editing={false}
        toggleEditing={() => {}}
        nickname={mockNickname}
        setNickname={() => {}}
        updateNickname={() => {}}
        message={''}
      />,
    );

    expect(screen.getByText('내 닉네임:')).toBeInTheDocument();
    expect(screen.getByText(mockNickname)).toBeInTheDocument();
  });

  it('편집 상태에서 입력 필드와 저장 버튼이 보여야 한다.', () => {
    const mockNickname = '햄스터';

    render(
      <NicknameEditor
        editing={true}
        toggleEditing={() => {}}
        nickname={mockNickname}
        setNickname={() => {}}
        updateNickname={() => {}}
        message={''}
      />,
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('저장')).toBeInTheDocument();
  });

  it('닉네임 수정 버튼을 클릭하면 toggleEditing 함수가 호출되어야 한다.', () => {
    const toggleEditing = jest.fn();

    render(
      <NicknameEditor
        editing={false}
        toggleEditing={toggleEditing}
        nickname={'햄스터'}
        setNickname={() => {}}
        updateNickname={() => {}}
        message={''}
      />,
    );

    act(() => {
      fireEvent.click(screen.getByText('닉네임 수정하기'));
    });

    expect(toggleEditing).toHaveBeenCalled();
  });

  it('저장 버튼을 클릭하면 updateNickname 함수가 호출되어야 한다.', () => {
    const updateNickname = jest.fn();

    render(
      <NicknameEditor
        editing={true}
        toggleEditing={() => {}}
        nickname={'햄스터'}
        setNickname={() => {}}
        updateNickname={updateNickname}
        message={''}
      />,
    );

    act(() => {
      fireEvent.click(screen.getByText('저장'));
    });

    expect(updateNickname).toHaveBeenCalled();
  });
});
