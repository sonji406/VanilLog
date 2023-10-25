import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import NicknameEditor from '@src/components/Profile/NicknameEditor';

const mockUserData = {
  _id: 'testUserId',
  nickname: 'testUserNickname',
  email: 'test@test.com',
  socialLoginType: 'google',
};

describe('<NicknameEditor />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('닉네임 편집 컴포넌트가 올바르게 렌더링 되어야 한다.', () => {
    render(
      <NicknameEditor
        editing={false}
        toggleEditing={() => {}}
        nickname={mockUserData.nickname}
        setNickname={() => {}}
        updateNickname={() => {}}
        message=''
      />,
    );
  });

  it('변경하기 버튼을 클릭하면 편집 가능한 상태로 변경되어야 한다.', () => {
    const toggleEditing = jest.fn();
    const { getByText, queryByRole } = render(
      <NicknameEditor
        editing={false}
        toggleEditing={toggleEditing}
        nickname={mockUserData.nickname}
        setNickname={() => {}}
        updateNickname={() => {}}
        message=''
      />,
    );

    expect(queryByRole('textbox')).toBeNull();

    const editButton = getByText('변경하기');
    act(() => {
      fireEvent.click(editButton);
    });

    expect(toggleEditing).toHaveBeenCalled();
  });

  it('닉네임 변경이 완료되면 올바른 메시지가 나타나야 한다.', async () => {
    let showMessage = '';
    const setMessage = (newMessage) => {
      showMessage = newMessage;
    };

    const { rerender, getByText } = render(
      <NicknameEditor
        editing={false}
        toggleEditing={() => {}}
        nickname={mockUserData.nickname}
        setNickname={() => {}}
        updateNickname={() => {}}
        message=''
      />,
    );

    act(() => {
      setMessage('닉네임이 성공적으로 업데이트되었습니다');
    });

    rerender(
      <NicknameEditor
        editing={false}
        toggleEditing={() => {}}
        nickname={mockUserData.nickname}
        setNickname={() => {}}
        updateNickname={() => {}}
        message={showMessage}
      />,
    );

    expect(
      getByText('닉네임이 성공적으로 업데이트되었습니다'),
    ).toBeInTheDocument();
  });
});
