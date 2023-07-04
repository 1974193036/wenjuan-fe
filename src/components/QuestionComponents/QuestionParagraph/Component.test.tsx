import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
  render(<Component />) // 渲染组件
  const h = screen.getByText('一行段落')
  expect(h).toBeInTheDocument()
})

test('传入属性', () => {
  render(<Component text="hello" isCenter={true} />) // 渲染组件

  const span = screen.getByText('hello')
  expect(span).toBeInTheDocument()

  const p = span.parentElement
  expect(p).not.toBeNull()

  const style = p!.style || {}
  expect(style.textAlign).toBe('center')
})

test('多行文字', () => {
  render(<Component text={'a\nb\nc'} />) // 渲染组件

  const span = screen.getByText('a')
  expect(span).toBeInTheDocument()

  expect(span).toHaveTextContent('a')
  expect(span).not.toHaveTextContent('ab') // 换行了
})
