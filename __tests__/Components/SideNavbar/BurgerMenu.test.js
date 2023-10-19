import React from 'react';
import { render } from '@testing-library/react';
import { BurgerMenu } from '@src/components/SideNavbar/BurgerMenu';

describe('<BurgerMenu />', () => {
  it('should render with "open" class when isOpen is true', () => {
    const { container } = render(<BurgerMenu isOpen={true} />);
    const divElement = container.firstChild;
    expect(divElement).toHaveClass('open');
  });

  it('should render without "open" class when isOpen is false', () => {
    const { container } = render(<BurgerMenu isOpen={false} />);
    const divElement = container.firstChild;
    expect(divElement).not.toHaveClass('open');
  });
});
