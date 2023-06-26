import React, { FC, useEffect } from 'react'
import { QuestionCheckboxPropsType, OptionType } from './interface'
import { Button, Checkbox, Form, Input, Space } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'

const PropComponent: FC<QuestionCheckboxPropsType> = (props) => {
  const { title, isVertical, list = [], onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, list })
  }, [title, isVertical, list])

  const handleValueChange = () => {
    if (onChange) {
      const newValues = form.getFieldsValue() as QuestionCheckboxPropsType
      onChange(newValues)
    }
  }
  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ title, isVertical, list }}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => {
            // console.log(fields)
            // [
            //   {name: 0, key: 0, isListField: true, fieldKey: 0},
            //   {name: 1, key: 1, isListField: true, fieldKey: 1},
            //   {name: 2, key: 2, isListField: true, fieldKey: 2},
            // ]
            return (
              <>
                {fields.map(({ key, name }, index) => {
                  return (
                    <Space key={key} align="baseline">
                      <Form.Item name={[name, 'checked']} valuePropName="checked">
                        <Checkbox />
                      </Form.Item>
                      {/* 当前选项 输入框 */}
                      <Form.Item
                        name={[name, 'text']}
                        rules={[
                          { required: true, message: '请输入选项文字' },
                          {
                            validator: (_, text) => {
                              const { list = [] } = form.getFieldsValue()
                              let num = 0
                              list.forEach((opt: OptionType) => {
                                if (opt.text === text) num++ // 记录 text 相同的个数，预期只有 1 个（自己）
                              })
                              if (num === 1) return Promise.resolve()
                              return Promise.reject(new Error('和其他选项重复了'))
                            }
                          }
                        ]}
                      >
                        <Input placeholder="输入选项文字..." style={{ width: '110px' }} />
                      </Form.Item>
                      <Form.Item
                        name={[name, 'value']}
                        rules={[
                          { required: true, message: '请输入选项编码' },
                          {
                            validator: (_, value) => {
                              const { list = [] } = form.getFieldsValue()
                              let num = 0
                              list.forEach((opt: OptionType) => {
                                if (opt.value === value) num++ // 记录 text 相同的个数，预期只有 1 个（自己）
                              })
                              if (num === 1) return Promise.resolve()
                              return Promise.reject(new Error('和其他选项重复了'))
                            }
                          }
                        ]}
                      >
                        <Input placeholder="输入选项编码..." style={{ width: '110px' }} />
                      </Form.Item>

                      {/* 当前选项 删除按钮 */}
                      {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                    </Space>
                  )
                })}

                {/* 添加选项 */}
                <Form.Item>
                  <Button
                    type="link"
                    onClick={() => add({ text: '', value: '', checked: false })}
                    block
                    icon={<PlusCircleOutlined />}
                  >
                    添加选项
                  </Button>
                </Form.Item>
              </>
            )
          }}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
