import { Button, Form, Input, message, Modal, DatePicker } from "antd"
import React, { useState } from "react"
import { createVideo } from "../../../Utils/requests"
import "./VideoCreator.less"
import VideoPage from '../../Video/VideoPage'
//import NavBar from "../../../components/NavBar/NavBar"

function parseYouTubeVideoId(url) {
  // Regular expression for extracting YouTube video ID
  const regex = /[?&]v=([^#&?]+)/
  const match = url.match(regex)

  // Check if there's a match and return the video ID
  return match && match[1] ? match[1] : null
}

export default function VideoCreator({ gradeList }) {
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [description, setDescription] = useState("")
  const [releaseDate, setReleaseDate] = useState("")
  const [selectedDateTime, setSelectedDateTime] = useState(null)
  const [isVideoLocked, setIsVideoLocked] = useState(true)

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
    const combinedDateTime = new Date(dateString + ' ' + date.format('HH:mm'))
    setSelectedDateTime(combinedDateTime)
    // Check if the new date is in the future
    const isFutureDate = date ? date > new Date() : true

    // Update the video lock status based on the new date
    setIsVideoLocked(!isFutureDate)
  }
  /*const handleToggleVideoLock = () => {
    const currentDate = new Date();
    if (selectedDateTime && selectedDateTime > currentDate) {
      setIsVideoLocked(true);
    } else {
      setIsVideoLocked(!isVideoLocked);
    }
  }*/
  //const isVidLocked = selectedDateTime ? selectedDateTime > new Date() : true;


  const openVideoPageInNewTab = () => {
    const videoPageUrl = `${window.location.origin}/video-page`; // Adjust the URL as needed
    window.open(videoPageUrl, '_blank');
  }

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
              format="YYYY-MM-DD HH:mm"
              onChange={handleDateTimeChange}
            />
          </Form.Item>
          <Button type="primary" onClick={openVideoPageInNewTab} disabled={isVideoLocked}>
            {isVideoLocked ? 'Video Locked' : 'Watch Video'}
          </Button>

          {isVideoLocked ? (
        <p>Video will be unlocked after the specified date and time.</p>
          ) : (
        <div>
          <p>Video is now unlocked and can be viewed.</p>
          {/* Render the VideoPage component */}
          <VideoPage thisID={parseYouTubeVideoId(url)} thisTitle={name} />
        </div>
          )}
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
