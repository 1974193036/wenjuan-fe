import React, { FC, useRef } from 'react'
import styles from './StatHeader.module.scss'
import { Button, Input, InputRef, Popover, Space, Tooltip, Typography, message } from 'antd'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetPageInfo } from '@/hooks/useGetPageInfo'
import QRCode from 'qrcode.react'

const { Title } = Typography

const StatHeader: FC = () => {
  const nav = useNavigate()
  const { id } = useParams()

  const { title, isPublished } = useGetPageInfo()

  const inputRef = useRef<InputRef>(null)
  const copy = () => {
    const elem = inputRef.current
    if (!elem) return
    elem.select()
    document.execCommand('copy')
    message.success('拷贝成功')
  }

  const genLinkAndQRCodeElem = () => {
    if (!isPublished) return null

    // 拼接 url ，需要参考 C 端的规则
    const url = `http://localhost:3000/question/${id}`

    // 定义二维码组件
    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} size={150} />
      </div>
    )

    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={inputRef} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{genLinkAndQRCodeElem()}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
