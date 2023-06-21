import React, { FC, useEffect } from 'react'
import { Checkbox, Form, Input, Select } from 'antd'
import { QuestionTitlePropsType } from './interface'

const PropComponent: FC<QuestionTitlePropsType> = (props) => {
  const { text, level, isCenter, onChange } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter })
  }, [text, level, isCenter])

  const handleValueChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ text, level, isCenter }}
      onValuesChange={handleValueChange}
    >
      <Form.Item
        label="标题内容"
        name="text"
        rules={[{ required: true, message: '请输入标题内容' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 }
          ]}
        ></Select>
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
