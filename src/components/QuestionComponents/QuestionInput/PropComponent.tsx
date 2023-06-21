import React, { FC, useEffect } from 'react'
import { QuestionInputPropsType } from './interface'
import { Form, Input } from 'antd'

const PropComponent: FC<QuestionInputPropsType> = (props) => {
  const { title, placeholder, onChange } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])

  const handleValueChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ title, placeholder }}
      onValuesChange={handleValueChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
