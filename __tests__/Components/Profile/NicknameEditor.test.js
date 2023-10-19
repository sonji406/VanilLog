import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import NicknameEditor from '@src/components/Profile/NicknameEditor';

const mockUserData = {
  _id: '1234567890',
  nickname: 'testUser',
  email: 'test@test.com',
  socialLoginType: 'google',
};

describe('<NicknameEditor />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
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

  it('should toggle edit mode and show input field when "변경하기" button is clicked', () => {
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

  it('should update message and display it briefly when message prop changes', async () => {
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
      setMessage('Your nickname has been updated.');
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

    expect(getByText('Your nickname has been updated.')).toBeInTheDocument();
  });
});
