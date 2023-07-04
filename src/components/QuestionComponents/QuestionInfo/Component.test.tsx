import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
  render(<Component />) // 渲染组件
  const h = screen.getByText('问卷标题')
  expect(h).toBeInTheDocument()
})

test('传入属性', () => {
  render(<Component title="hello" desc="word" />) // 渲染组件

  const h = screen.getByText('hello')
  expect(h).toBeInTheDocument()

  const p = screen.getByText('word')
  expect(p).toBeInTheDocument()
})

test('多行文字', () => {
  render(<Component desc={'a\nb\nc'} />) // 渲染组件

  const span = screen.getByText('a')
  expect(span).toBeInTheDocument()

  expect(span).toHaveTextContent('a')
  expect(span).not.toHaveTextContent('ab') // 换行了
})
