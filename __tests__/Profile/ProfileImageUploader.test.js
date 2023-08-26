import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ProfileImageUploader from '@src/components/Profile/ProfileImageUploader';

describe('<ProfileImageUploader />', () => {
  it('기본 이미지를 올바르게 렌더링한다', () => {
    render(
      <ProfileImageUploader
        uploadedImage={null}
        userProfile={null}
        handleImageUpload={() => {}}
        inputRef={React.createRef()}
      />,
    );

    const image = screen.getByAltText('Profile Image');

    expect(image).toBeInTheDocument();
  });

  it('업로드된 이미지가 있다면 그것을 보여준다', () => {
    const uploadedImage = '/some-image-url.png';

    render(
      <ProfileImageUploader
        uploadedImage={uploadedImage}
        userProfile={null}
        handleImageUpload={() => {}}
        inputRef={React.createRef()}
      />,
    );

    const image = screen.getByAltText('Profile Image');

    expect(image.src).toContain(encodeURIComponent(uploadedImage));
  });

  it('버튼 클릭시 input의 click 메소드가 호출된다', () => {
    const mockClick = jest.fn();
    const ref = React.createRef();

    act(() => {
      render(
        <ProfileImageUploader
          uploadedImage={null}
          userProfile={null}
          handleImageUpload={() => {}}
          inputRef={ref}
        />,
      );
    });

    ref.current.click = mockClick;

    act(() => {
      fireEvent.click(screen.getByText('사진 업로드/변경'));
    });

    expect(mockClick).toHaveBeenCalled();
  });
});
