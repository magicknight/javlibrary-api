
# -*- coding: UTF-8 -*-

import cfscrape


tokens, user_agent = cfscrape.get_cookie_string('http://www.javlibrary.com/') # noqa
with open('./session.txt', 'w') as file:
    file.write('{}+{}\r\n'.format(tokens, user_agent))

print '\033[94m' + 'Generate session file is successful! 💊' + '\033[0m'
