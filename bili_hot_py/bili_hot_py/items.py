# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class BiliHotPyItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    aid = scrapy.Field() # aid', isShow: false
    bvid = scrapy.Field() # bvid', isShow: false
    cid = scrapy.Field() # cid', isShow: false
    title = scrapy.Field() # 标题', isShow: truee
    title_url = scrapy.Field() # 视频地址', isShow: false
    owner_name = scrapy.Field() # 作者', isShow: truee
    owner_url = scrapy.Field() # 作者连接', isShow: false
    vdesc = scrapy.Field() # 视频描述', isShow: false
    tname = scrapy.Field() # 视频分类', isShow: true
    pic = scrapy.Field() # 视频图片', isShow: falsee
    ctime = scrapy.Field() # 创建时间', isShow: false
    pubdate = scrapy.Field() # 发布时间', isShow: true
    rcmd_reason = scrapy.Field() # 推荐原因', isShow: true
    videos = scrapy.Field() # 视频数', isShow: false
    copyright = scrapy.Field() # 版权所有', isShow: false
    view = scrapy.Field() # 播放数', isShow: true
    like_count = scrapy.Field() # 点赞数', isShow: true
    favorite = scrapy.Field() # 收藏数', isShow: true
    coin = scrapy.Field() # 投币数', isShow: false
    share = scrapy.Field() # 分享数', isShow: false
    data_date = scrapy.Field() # 数据时间', isShow: true
    pass
