import { expect, afterEach, describe, test, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
import { Keyboard } from "./Keyboard";

describe("компонент Keyboard", () => {
  test('что-то проверяем', () => {
    const foo = vi.fn();

    // foo(1)
    // foo(2)

    render(
      <Keyboard
        disabled={false}
        deleteLetter={foo}
        pushWord={() => { }}
        enteringWords={() => { }}
        onKeyboardCheckLetters={new Map()}
      />
    );


    // <Keyboard
    //   disabled={false}
    //   onLetterPress={(letter) => {}}
    //   onEnterPress={() => { }}
    //   onBackspacePress={() => { }}
    //   letter2status={new Map()}
    // />

    // в компоненте Keyboard добавить testid, чтобы потом найти нужную кнопку
    // клик по кеопку delete

    expect(foo).toHaveBeenCalledTimes(1)

  });

  //напиши тесты на компоеннты, переделай функции на проверку слов чтобы отрисовывались 🧲🧲🧲🧲🧲🧲🧲🧲🧲🧲🧲🧲🧲🧲🧲

  test('Клавиатура рисует 26 + 2 = 28 кнопок', () => {
    render(
      <Keyboard disabled={false}
        deleteLetter={() => { }}
        pushWord={() => { }}
        enteringWords={() => { }}
        onKeyboardCheckLetters={new Map()}
      />
    );

    // https://testing-library.com/docs/queries/about/
    const buttons = screen.queryAllByRole("button");
    expect(buttons).toHaveLength(28);
    // console.log(buttons);
  });


});


/* 
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders headline', () => {
    render(<App title="React" />);

    screen.debug();

    // check if App components renders headline
  });
});


*/