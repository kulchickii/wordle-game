import { expect, describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from "@testing-library/jest-dom/matchers";
import { Keyboard } from "./Keyboard";

expect.extend(matchers);

describe("компонент Keyboard", () => {
//====================
  it('Клавиатура рисует 26 + 2 = 28 кнопок', () => {
    render(
      <Keyboard 
        disabled={false} 
        handleBackspace={() => {}} 
        handleSubmitWord={() => {}} 
        handleLetterInput={() => {}} 
        onKeyboardCheckLetters={{}} 
     />);
    const buttons = screen.queryAllByRole("button")
    expect(buttons).toHaveLength(28)
  });
//====================
  it('рисуются нужные буквы от q до m', () => {
    render(
      <Keyboard 
        disabled={false}
        handleBackspace={() => {}}
        handleSubmitWord={() => {}}
        handleLetterInput={() => {}}
        onKeyboardCheckLetters={{}}
      />)

    for (const letter of 'qwertyuiopasdfghjklzxcvbnm') {
      // console.log('>>',letter);
      const upLetter = letter.toUpperCase()
      const element = screen.getByText(upLetter)   
      expect(element).toBeTruthy()// если есть элемент, то все ок, остальное err
    }
  });
//====================
  it('вызов handleLetterInput при клике по букве', async () => {
    const handleLetterInput = vi.fn()

    render(
      <Keyboard 
        disabled={false}
        handleBackspace={() => {}}
        handleSubmitWord={() => {}}
        handleLetterInput={handleLetterInput}
        onKeyboardCheckLetters={{}}
      />)

    const btnR = screen.getByText('R')
    await userEvent.click(btnR)
    expect(handleLetterInput).toHaveBeenCalledWith('r')

    const btnD = screen.getByText('D')
    await userEvent.click(btnD)
    expect(handleLetterInput).toHaveBeenCalledWith('d') //вызов функции c нужным аргументом
  })
//====================
  it('ввод клавиш с клавиатуры', () => {
    const handleLetterInput = vi.fn()
    const handleBackspace = vi.fn()
    const handleSubmitWord = vi.fn()

    render(
      <Keyboard 
        disabled={false}
        handleBackspace={handleBackspace}
        handleSubmitWord={handleSubmitWord}
        handleLetterInput={handleLetterInput}
        onKeyboardCheckLetters={{}}
      />
    );

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'r' }))
    expect(handleLetterInput).toHaveBeenCalledWith('r')

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    expect(handleSubmitWord).toHaveBeenCalled()

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }))
    expect(handleBackspace).toHaveBeenCalled()
  })
//====================
  it('вызывает handleBackspace при клике по кнопке back', async () => {
    const handleBackspace = vi.fn()
    render(
      <Keyboard 
        disabled={false}
        handleBackspace={handleBackspace}
        handleSubmitWord={() => {}}
        handleLetterInput={() => {}}
        onKeyboardCheckLetters={{}}
      />)
    const btn = screen.getByTestId('el-backspace')
    await userEvent.click(btn)
    expect(handleBackspace).toHaveBeenCalled("el-backspace")   
  })

 //====================
  it('вызывает handleSubmitWord при клике по enter', async () => {
    const handleSubmitWord = vi.fn()
    render(
      <Keyboard 
        disabled={false}
        handleBackspace={() => {}}
        handleSubmitWord={handleSubmitWord}
        handleLetterInput={() => {}}
        onKeyboardCheckLetters={{}}
      />)

    const btn = screen.getByTestId('el-enter')
    await userEvent.click(btn)
    expect(handleSubmitWord).toHaveBeenCalled('el-enter')
  });
 //====================
  it('если disabled => то функции вызываются )', () => {
    const handleBackspace = vi.fn();
    const handleSubmitWord = vi.fn();
    const handleLetterInput = vi.fn();
    
    render(
      <Keyboard 
        disabled={true}
        handleBackspace={handleBackspace}
        handleSubmitWord={handleSubmitWord}
        handleLetterInput={handleLetterInput}
        onKeyboardCheckLetters={{}} 
      />
    )

    const buttons = screen.getAllByRole('button')
    for (const btn of buttons) {
      expect(btn).toBeDisabled()      
      userEvent.click(btn);
    }
  
    expect(handleBackspace).not.toHaveBeenCalled();
    expect(handleSubmitWord).not.toHaveBeenCalled();
    expect(handleLetterInput).not.toHaveBeenCalled();
  })

});

