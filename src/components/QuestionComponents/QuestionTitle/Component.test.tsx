import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
  render(<Component />) // 渲染组件
  const h = screen.getByText('一行标题')
  expect(h).toBeInTheDocument()
})

test('传入属性', () => {
  render(<Component text="hello" level={2} isCenter={true} />) // 渲染组件

  const h = screen.getByText('hello')
  expect(h).toBeInTheDocument()

  expect(h.matches('h2')).toBeTruthy() // <h2>

  const style = h.style
  expect(style.textAlign).toBe('center')
})
