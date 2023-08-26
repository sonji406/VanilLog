import React from 'react';
import { render } from '@testing-library/react';
import { BurgerMenu } from '@src/components/SideNavbar/BurgerMenu';

describe('<BurgerMenu />', () => {
  it('isOpen이 false일 때 open 클래스가 없어야 한다.', () => {
    const { container } = render(<BurgerMenu isOpen={false} />);
    const div = container.firstChild;

    expect(div.className).toBe('w-5 h-5 flex flex-col justify-between ');
  });

  it('isOpen이 true일 때 open 클래스가 있어야 한다.', () => {
    const { container } = render(<BurgerMenu isOpen={true} />);
    const div = container.firstChild;

    expect(div.className).toBe('w-5 h-5 flex flex-col justify-between open');
  });
});
