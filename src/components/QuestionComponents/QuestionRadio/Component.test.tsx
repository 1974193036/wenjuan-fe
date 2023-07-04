import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
  render(<Component />) // 渲染组件
  const p = screen.getByText('单选标题')
  expect(p).toBeInTheDocument()

  for (let i = 1; i <= 3; i++) {
    const radio = screen.getByDisplayValue(`item${i}`)
    expect(radio).toBeInTheDocument()
    const label = screen.getByText(`选项${i}`)
    expect(label).toBeInTheDocument()
  }
})

test('传入属性', () => {
  const opts = [
    { value: 'v1', text: 't1' },
    { value: 'v2', text: 't2' },
    { value: 'v3', text: 't3' }
  ]
  const value = 'v2'

  render(<Component title="hello" options={opts} value={value} />) // 渲染组件

  const p = screen.getByText('hello')
  expect(p).toBeInTheDocument()

  for (let i = 1; i <= 3; i++) {
    const curVal = `v${i}`
    const radio = screen.getByDisplayValue(curVal)
    expect(radio).toBeInTheDocument()
    const label = screen.getByText(`t${i}`)
    expect(label).toBeInTheDocument()
    // 选中的
    if (curVal === value) {
      expect(radio.getAttribute('checked')).not.toBeNull()
    }
  }

  // const h = screen.getByText('hello')
  // expect(h).toBeInTheDocument()

  // const p = screen.getByPlaceholderText('word')
  // expect(p).toBeInTheDocument()
})
