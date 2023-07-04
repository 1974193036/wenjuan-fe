import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
  render(<Component />) // 渲染组件
  const p = screen.getByText('输入框标题')
  expect(p).toBeInTheDocument()

  const input = screen.getByPlaceholderText('请输入...')
  expect(input).toBeInTheDocument()
})

test('传入属性', () => {
  render(<Component title="hello" placeholder="word" />) // 渲染组件

  const h = screen.getByText('hello')
  expect(h).toBeInTheDocument()

  const p = screen.getByPlaceholderText('word')
  expect(p).toBeInTheDocument()
})
