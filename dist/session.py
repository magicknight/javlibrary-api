
import time
import cfscrape
import schedule


def job():
    tokens, user_agent = cfscrape.get_cookie_string('http://www.javlibrary.com/') # noqa
    with open('./session.txt', 'w') as file:
        file.write('{}:{}\r\n'.format(tokens, user_agent))


job()
schedule.every(30).minutes.do(job)

while 1:
    schedule.run_pending()
    time.sleep(1)
