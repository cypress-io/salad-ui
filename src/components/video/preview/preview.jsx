import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Badge from '../../util/badge/badge'
import Trans from '../../util/trans/trans'
import Checkbox from '../../form/checkbox/checkbox'
import Icon from '../../icon/icon'
import TextClamp from '../../util/text-clamp/text-clamp'
import TimeAndViews from '../../util/time-and-views/time-and-views'

import styles from './_stylesheet'

export const mediaTypes = {
  video: {
    fields: [
      'id',
      'uri',
      'duration',
      'record_status',
      'duration_formatted',
      'title',
      'description',
      'onair',
      'private',
      'password',
      'advertising_instream_blocked',
      'svod',
      'channel',
      'language',
      'views_total',
      'created_time',
      'thumbnail_240_url',
      'tags',
    ]
  },
  playlist: {
    fields: [
      'id',
      'uri',
      'name',
      'description',
      'videos_total',
      'owner.username',
      'owner.screenname',
      'thumbnail_240_url',
    ]
  }
}

export default class Preview extends Component {
  trans = DM_ENV['video/preview']

  state = {
    hovered: false
  }

  static propTypes = {
    type: PropTypes.oneOf(['list', 'grid']),
    mediaType: PropTypes.oneOf(['video', 'playlist']),
    width: PropTypes.number,
  }

  static defaultProps = {
    type: 'grid',
    pixelle: false,
    playing: false,
    style: null,
    mediaType: 'video',
    width: 120
  }

  render() {
    let type = 'duration',
        label = '',
        previewStyles = styles[this.props.type]

    if(this.props.mediaType === 'video'){
      label = this.props.duration_formatted
      let isRecording = this.props.record_status && this.props.record_status !== 'stopped'

      if (this.props.onair) {
        type = 'live'
        label = (<Trans context={this.trans}>LIVE</Trans>)
      } else if (isRecording) {
        type = 'recording'
        let duration = moment.duration({seconds: moment.utc().unix() - this.props.created_time}),
            s = duration.seconds(),
            m = duration.minutes(),
            h = duration.hours()

        label = `${m > 9 ? m : '0' + m}:${s > 9 ? s : '0' + s}`
        if (duration.hours()) {
          label = `${h > 9 ? h : '0' + h}:${label}`
        }
      }
    }
    else if(this.props.mediaType === 'playlist'){
      label = <span>{this.props.videos_total + ' '}<Trans context={this.trans}>videos</Trans></span>
    }

    const height = this.props.height || this.props.width / 1.77 || previewStyles.image.height,
          width = this.props.width || previewStyles.image.width

    return (
      <div
        onMouseOver={() => {
          this.setState({ hovered:true })
        }}
        onMouseOut={() => {
          this.setState({ hovered:false })
        }}
        onClick={() => {
          if(this.props.onSelect)
            this.props.onSelect()
          else if(this.props.onClick)
            this.props.onClick()
          else
            window.location.href = this.props.uri
        }}
        style={Object.assign(
          {},
          previewStyles.preview,
          {
            height: this.props.type === 'grid' ? height + 70 : height,
            width: this.props.type === 'grid' ? width : 'auto',
          },
          this.state.hovered && this.props.onSelect ? styles.selectableHover : styles.selectable,
          this.props.selected ? styles.selected : null,
          this.props.style,
        )}>
        <div style={{width,height, overflow: 'hidden', display: 'table'}}>
          <div
            className={`transition-md transition-timing-ease-in-out ${this.state.hovered&&!this.props.onSelect?'scale-in-md':''}`}
            style={Object.assign(
              {},
              {
                backgroundImage: `url(${this.props.thumbnail_240_url})`,
                backgroundSize: 'cover',
                height,
                width,
              },
              this.state.hovered && this.props.onSelect ? styles.selectableHoverImage : null
            )}
          />
        </div>
        <div style={Object.assign({}, previewStyles.badgeContainer, {width, height})}>
          {
            this.props.onSelect ?
            <Checkbox checked={this.props.selected} style={{position: 'absolute', left: 5, top: 5}}/>:
            null
          }
          {this.props.onRemove
            ? <div
                style={{position: 'absolute', right: 5, top: 5, zIndex: 2}}
                onClick={(e) => {e.stopPropagation(); this.props.onRemove()}}>
                <Icon type="delete" width={16} height={16} fill="white" />
            </div>
            : null
          }
          {
            this.props.private ?
            <Badge position="btm-start" type="private" />:
            null
          }
          {<Badge position="btm-end" type={type}>{label}</Badge>}
          {this.props.playing ? <Badge position="top-start" type="staff"><Trans context={this.trans}>Now playing</Trans></Badge> : null}
        </div>
        <div style={previewStyles.text}>
          <h3
            style={Object.assign({}, previewStyles.title, {
              textDecoration: this.state.hovered && !this.props.onSelect ? 'underline' : 'none',
              color: styles.link.color,
              fontSize: 15
            })}>
            <TextClamp clamp="2">
              {
                this.props.mediaType === 'video' ?
                this.props.title:
                this.props.name
              }
            </TextClamp>
          </h3>
          {
            this.props.mediaType === 'video' ?
            <TimeAndViews noUploadLabel={true} time={this.props.created_time} views={this.props.views_total}/>:
            null
          }
        </div>
        <span style={styles.after}/>
      </div>
    )
  }
}
