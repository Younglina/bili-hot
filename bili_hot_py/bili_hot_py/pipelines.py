# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import openpyxl
import time

class BiliHotPyPipeline:
    def __init__(self):
        self.wb = openpyxl.Workbook()
        self.sheet = self.wb.active
        self.sheet.title = 'B站综合热门前100_'+time.strftime('%Y-%m-%d')
        self.sheet.append(('aid','bvid','cid','标题','视频地址','作者','作者连接','视频描述','视频分类','视频图片','创建时间','发布时间','推荐原因','视频数','版权所有','播放数','点赞数','收藏数','投币数','分享数','数据时间'))
    
    def process_item(self, item, spider):
        self.sheet.append((item['aid'],item['bvid'],item['cid'],item['title'],item['title_url'],item['owner_name'],item['owner_url'],item['vdesc'],item['tname'],item['pic'],item['ctime'],item['pubdate'],item['rcmd_reason'],item['videos'],item['copyright'],item['view'],item['like_count'],item['favorite'],item['coin'],item['share'],item['data_date']))
        return item
    
    def close_spider(self, spider):
        self.wb.save(self.sheet.title+'.xlsx')
