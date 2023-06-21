import React, { FC } from 'react'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'

const RightPanel: FC = () => {
  const tabsItems = [
    {
      key: 'prop',
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />
    },
    {
      key: 'setting',
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />
    }
  ]
  return <Tabs defaultActiveKey="prop" items={tabsItems} />
}

export default RightPanel
