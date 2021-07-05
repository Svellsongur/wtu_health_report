# 健康上报



## 介绍 Intro

每日健康上报打卡小脚本



## 安装 Setup

```shell
pip install wtu
```



## 身份证 Token

To active this script, you need to get the 'JWT' authorization from WeChat App,

The token, expired after 7 days, you may replace and refresh it once a week



## 健康上报 Health Report

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

from wtu import health_report
import schedule

JWT = ''
jk = health_report.JKClient(JWT)

def report():
    jk.health_report('student_number')

schedule.every().day.at("00:10").do(report)

while True:
    schedule.run_pending()
    time.sleep(180)
```
