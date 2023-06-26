import { useGetPageInfo } from '@/hooks/useGetPageInfo'
import { resetPageInfo } from '@/store/pageInfoReducer'
import { Form, Input } from 'antd'
import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'

const TextArea = Input.TextArea

const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo()

  const [form] = Form.useForm()

  // 实时更新表单内容
  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  const dispatch = useDispatch()

  const handleValuesChange = () => {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }

  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label="问卷标题"
        name="title"
        rules={[{ required: true, message: '请输入问卷标题' }]}
      >
        <Input placeholder="请输入问卷标题" />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea placeholder="问卷描述..." />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder="输入css样式代码..." />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="输入js脚本代码..." />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
