import React, {useEffect, useState} from 'react'
import {Row, Col, List, Avator} from 'antd'
import Axios from 'axios'

function VideoDetailPage(props){

    const videoId = props.match.params.videoId
    const variable = {videoId : videoId}
    const [videoDetail, setVideoDetail] = useState([])

    useEffect(() => {
        Axios.post('/api/videos/getVideoDetail', variable).then(res => {
            if(res.data.success){
                setVideoDetail(res.data.videoDetail)
            }else{
                alert('비디오 가저오기 실패')
            }
        })
    }, [])

    if(videoDetail.writer){
    return (
        <Row gutter={[16, 16]}>
            <Col lg={18} xs={24}>
                <div style={{width: `100%`, padding='3rem 4rem'}}>
                    <video style={{width:'100%'}} src={`http://localhost:5000/${videoDetail.filePath}`} controls />
                    <List.Item actions>
                        <List.Item.Meta avator={<Avator src={videoDetail.writer.image} />} title={videoDetail.writer.title} description={videoDetail.writer.description} />
                    </List.Item>
                </div>
            </Col>
            <Col lg={6} xs={24}>
                Side Videos
            </Col>
        </Row>
    )
} else{
    return (<div>...loading</div>)
}
}

export default VideoDetailPage