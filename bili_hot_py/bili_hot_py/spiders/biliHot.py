import scrapy
from bili_hot_py.items import BiliHotPyItem
import time

class BilihotSpider(scrapy.Spider):
    name = "biliHot"
    allowed_domains = ["api.bilibili.com"]

    def start_requests(self):
            for page in range(5):
                yield scrapy.Request(url=f'https://api.bilibili.com/x/web-interface/popular?ps=20&pn={page+1}')

    def parse(self, response):
        data = response.json()
        biliItem = BiliHotPyItem()
        for item in data['data']['list']:
            biliItem['aid'] = item['aid']
            biliItem['bvid'] = item['bvid']
            biliItem['cid'] = item['cid']
            biliItem['title'] = item['title']
            biliItem['title_url'] = item['short_link_v2']
            biliItem['owner_name'] = item['owner']['name']
            biliItem['owner_url'] = f'https://space.bilibili.com/'+str(item['owner']['mid'])
            biliItem['vdesc'] = item['desc']
            biliItem['tname'] = item['tname']
            biliItem['pic'] = item['pic']
            biliItem['ctime'] = time.strftime('%Y%m%d',time.localtime(item['ctime']*1000))
            biliItem['pubdate'] = time.strftime('%Y%m%d',time.localtime(item['pubdate']*1000))
            biliItem['rcmd_reason'] = item['rcmd_reason']['content']
            biliItem['videos'] = item['videos']
            biliItem['copyright'] = item['copyright']
            biliItem['view'] = item['stat']['view']
            biliItem['like_count'] = item['stat']['like']
            biliItem['favorite'] = item['stat']['favorite']
            biliItem['coin'] = item['stat']['coin']
            biliItem['share'] = item['stat']['share']
            biliItem['data_date'] = time.strftime('%Y%m%d')
            yield biliItem
