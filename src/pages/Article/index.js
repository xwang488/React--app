
import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import img404 from '@/assets/404image.png'
import { observer } from 'mobx-react-lite'
// import 'moment/locale/zh-cn'
// import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import { useEffect, useState } from 'react'
import { http } from '@/utils'
import { useStore } from '@/store'

const { Option } = Select
const { RangePicker } = DatePicker


const Article = () => {
  const { channelStore } = useStore()

  const [articleData, setArticleData] = useState({
    list: [],
    count: 0,
  })

  const [params, setParams] = useState({
    page: 1,
    per_page: 10
  })

  useEffect(() => {
    const loadlist = async () => {
      const res = await http.get('/mp/articles', { params })
      const { results, total_count } = res.data
      setArticleData({
        list: results,
        count: total_count
      })
    }
    loadlist()
  }, [params])

  const onFinish = (valus) => {
    const { channel_id, status, date } = valus
    const _params = {}

    if (status !== -1) {
      _params.status = status
    }
    if (channel_id) {
      _params.channel_id = channel_id
    }
    if (date) {
      _params.begin_pubdate = date[0].format('YYYY-MM-DD')
      _params.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    setParams({
      ...params,
      ..._params
    })
  }

  const pageChange = (page) => {
    setParams({
      ...params,
      page
    })
  }

  const formatStatus = (type) => {
    const TYPES = {
      1: <Tag color="red">WaittingReview</Tag>,
      2: <Tag color="green">Approved</Tag>
    }
    return TYPES[type]
  }

  const delArticle = async (data) => {
    await http.delete(`/mp/articles/${data.id}`)
    setParams({
      ...params,
      page: 1
    })
  }

  const navigate = useNavigate()
  const goPublish = (data) => {
    console.log(data.id)
    navigate(`/publish?id=${data.id}`)
  }

  const columns = [
    {
      title: 'Cover',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: 220
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: data => formatStatus(data)
    },
    {
      title: 'Pubish Date',
      dataIndex: 'pubdate'
    },
    {
      title: 'Read Count',
      dataIndex: 'read_count'
    },
    {
      title: 'Comment Count',
      dataIndex: 'comment_count'
    },
    {
      title: 'like Count',
      dataIndex: 'like_count'
    },
    {
      title: 'Operate',
      render: data => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={(() => goPublish(data))}
            />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => delArticle(data)}
            />
          </Space>
        )
      }
    }
  ]

  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">Front page</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>content management</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form
          onFinish={onFinish}
          initialValues={{ status: null }}>
          <Form.Item label="status" name="status">
            <Radio.Group>
              <Radio value={null}>Total</Radio>
              <Radio value={0}>Draft</Radio>
              <Radio value={1}>Waiting Review</Radio>
              <Radio value={2}>Pass Review</Radio>
              <Radio value={3}>Fail Review</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Channel" name="channel_id">
            <Select
              placeholder="Please select a channel"
              initialValues="C++"
              style={{ width: 120 }}
            >
              {channelStore.channelList.map(channel => <Option key={channel.id} value={channel.id}>{channel.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="date" name="date">

            <RangePicker ></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              Filter
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`total of ${articleData.count} result`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={articleData.list}
          pagination={{
            pageSize: params.per_page,
            total: articleData.count,
            onChange: pageChange
          }
          }
        />
      </Card>
    </div>
  )
}

export default observer(Article)