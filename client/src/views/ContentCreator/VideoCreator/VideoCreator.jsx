import { Button, Form, Input, message, Modal, DatePicker } from "antd"
import React, { useState } from "react"
import { createVideo } from "../../../Utils/requests"
import "./VideoCreator.less"

export default function VideoCreator({ gradeList }) {
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [description, setDescription] = useState("")
  const [releaseDate, setReleaseDate] = useState("")
  const [selectedDateTime, setSelectedDateTime] = useState(null)

  const showModal = () => {
    setName("")
    setUrl("")
    setDescription("")
    setReleaseDate("")
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const handleSubmit = async e => {
    const res = await createVideo(url, name, description, releaseDate)
    if (res.err) {
      message.error("Fail to create a new video")
    } else {
      message.success("Successfully created video")
      setVisible(false)
    }
  }

  const handleDateTimeChange = (date, dateString) => {
    // Combine the selected date and time
    const combinedDateTime = new Date(dateString + ' ' + date.format('HH:mm:ss'));
    setSelectedDateTime(combinedDateTime);
  };

  return (
    <div>
      <button onClick={showModal} id="add-video-btn">
        + Add Video
      </button>
      <Modal
        title="Create Video"
        open={visible}
        width="35vw"
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          id="add-videos"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          onFinish={handleSubmit}
          layout="horizontal"
          size="default"
        >
          <p>
            1. Upload video to youtube<br/>2. Copy/paste link to video
          </p>
          <Form.Item id="form-label" label="Video Name">
            <Input
              onChange={e => setName(e.target.value)}
              value={name}
              placeholder="Enter video name"
              required
            />
          </Form.Item>
          <Form.Item id="form-label" label="Video Url">
            <Input
              onChange={e => setUrl(e.target.value)}
              type="url"
              value={url}
              placeholder="Enter video url"
              required
            />
          </Form.Item>
          <Form.Item id="form-label" label="Description">
            <Input.TextArea
              rows={3}
              onChange={e => setDescription(e.target.value)}
              value={description}
              placeholder="Enter video description"
            />
          </Form.Item>
          <Form.Item label="Release Date" name="dateAndTime">
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              onChange={handleDateTimeChange}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
            style={{ marginBottom: "0px" }}
          >
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="content-creator-button"
            >
              Submit
            </Button>
            <Button
              onClick={handleCancel}
              size="large"
              className="content-creator-button"
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
