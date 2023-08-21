const dayjs = require('dayjs')

const popularColumns = [
  {key: 'aid', label: 'aid', isShow: false},
  {key: 'bvid', label: 'bvid', isShow: false},
  {key: 'cid', label: 'cid', isShow: false},
  {key: 'title', label: '标题', isShow: true, cType: 'href', width: '180px'},
  {key: 'title_url', label: '视频地址', isShow: false},
  {key: 'owner_name', label: '作者', isShow: true, cType: 'href', width: '120px'},
  {key: 'owner_url', label: '作者连接', isShow: false},
  {key: 'vdesc', label: '视频描述', isShow: false},
  {key: 'tname', label: '视频分类', isShow: true},
  {key: 'pic', label: '视频图片', isShow: false, cType: 'img'},
  {key: 'ctime', label: '创建时间', isShow: false},
  {key: 'pubdate', label: '发布时间', isShow: true},
  {key: 'rcmd_reason', label: '推荐原因', isShow: true},
  {key: 'videos', label: '视频数', isShow: false},
  {key: 'copyright', label: '版权所有', isShow: false},
  {key: 'view', label: '播放数', isShow: true},
  {key: 'like_count', label: '点赞数', isShow: true},
  {key: 'favorite', label: '收藏数', isShow: true},
  {key: 'coin', label: '投币数', isShow: false},
  {key: 'share', label: '分享数', isShow: false},
  {key: 'data_date', label: '数据时间', isShow: true},
]

const formatPopularData = (data) => {
  return {
    aid: data.aid,
    bvid: data.bvid,
    cid: data.cid,
    title: data.title,
    title_url: data.short_link_v2,
    owner_name: data.owner.name,
    owner_url: `https://space.bilibili.com/${data.owner.mid}`,
    vdesc: data.desc,
    tname: data.tname,
    pic: data.pic,
    ctime: dayjs(data.ctime*1000).format('YYYY-MM-DD'),
    pubdate: dayjs(data.pubdate*1000).format('YYYY-MM-DD'),
    rcmd_reason: data.rcmd_reason.content,
    videos: data.videos,
    copyright: data.copyright,
    view: data.stat.view,
    like_count: data.stat.like,
    favorite: data.stat.favorite,
    coin: data.stat.coin,
    share: data.stat.share,
    data_date: dayjs(new Date()).format('YYYY-MM-DD'),
  }
}

module.exports = {
  popularColumns,
  formatPopularData
}
