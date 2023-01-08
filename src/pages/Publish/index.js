import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store'
import { useState, useRef, useEffect } from 'react'
import { http } from '@/utils'
const { Option } = Select

const Publish = () => {
  const { channelStore } = useStore()
  //store image list to upload
  const [fileList, setFileList] = useState([])

  //image temporary storage we used (useRef)
  const tempImageList = useRef([])

  const onUploadChange = ({ fileList }) => {
    console.log(fileList)
    //the last log have reponse
    //finally,  in the react state fileList  store the (response.data.url)
    //formatted "fileList" data
    const formatList = fileList.map(file => {
      if (file.response) {
        //when image upload finish
        return { url: file.response.data.url }
      } else {
        //when image uploading
        return file
      }
    })
    setFileList(formatList)
    //add image list to temporary storage
    tempImageList.current = formatList
  }

  // switch image event
  const [imgCount, setImgCount] = useState(1)
  const radioChange = (e) => {
    const rawValue = e.target.value
    setImgCount(rawValue)
    //get image from temporary storage
    // call the setFileList function

    if (tempImageList.current.length === 0) {
      return false
    }

    if (rawValue === 1) {
      const image = tempImageList.current[0]
      setFileList([image])
    } else if (rawValue === 3) {
      setFileList(tempImageList.current)
    }
  }

  //upload the form information
  const navigate = useNavigate()
  const onFinish = async (values) => {
    console.log(values)
    //find the cover data and add it to values
    const { channel_id, content, title, type } = values
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        images: fileList.map(item => item.url)
      }
    }

    if (id) {
      await http.put(`/mp/articles/${id}?draft=false`, params)
    } else {
      await http.post('/mp/articles?draft=false', params)
    }

    //router 
    navigate('/article')
    message.success(`${id ? "update" : "publish"}publish article success!`)
  }


  // edit content
  const [params] = useSearchParams()
  const id = params.get('id')
  console.log('route:', id)
  // data backfill
  //1.form 2.temp imagestoreage 3.Upload component fileList
  const form = useRef()

  useEffect(() => {
    const loadDetail = async () => {
      const res = await http.get(`/mp/articles/${id}`)

      const resFormValue = res.data

      // data backfill
      form.current.setFieldsValue({ ...resFormValue, type: resFormValue.cover.type })

      //attention: url => {return {url}} same as url=>({url})
      const formatImageUrl = resFormValue.cover.images.map(url => ({ url }))

      setFileList(formatImageUrl)

      //add data to temp storage
      tempImageList.current = formatImageUrl
    }

    if (id) { loadDetail() }

  }, [id])
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">Front Page</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id ? "Edit" : "Publish"} Article</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1, content: 'This is content...' }}
          onFinish={onFinish}
          ref={form}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input Article Title' }]}
          >
            <Input placeholder="Please input Article Title" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="Channel"
            name="channel_id"
            rules={[{ required: true, message: 'Please select Channel' }]}
          >
            <Select placeholder="Please select Channel" style={{ width: 400 }}>
              {channelStore.channelList.map(channel => <Option key={channel.id} value={channel.id}>{channel.name}</Option>)}
              {/* {channelStore.channelList.map(channel => <Option key={channel.id} value={channel.id}>{channel.name}</Option>)} */}
              <Option value={0}></Option>
            </Select>
          </Form.Item>

          <Form.Item label="cover">
            <Form.Item name="type">
              <Radio.Group
                onChange={radioChange}
              >
                <Radio value={1}>Single image</Radio>
                <Radio value={3}>Three image</Radio>
                <Radio value={0}>No image</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={imgCount > 1}
                maxCount={imgCount}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}

          </Form.Item>
          <Form.Item
            label="conent"
            name="content"
            rules={[{ required: true, message: 'Please input Article Content' }]}
          >
            <ReactQuill theme="snow" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {id ? "Update" : "Publish"} Article
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(Publish)