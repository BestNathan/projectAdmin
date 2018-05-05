'use strict'
const axios = require('axios')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')

async function getOrders(page) {
    page = page || 1
    let obj = {}
    let count = 0
    let data = await getOrderList(page)
    let $ = cheerio.load(data.data, { decodeEntities: false })
    data = []
    $('table tbody')
        .children()
        .each(function(i, el) {
            if ($(this).find('td').length > 0) {
                let href,
                    title,
                    price,
                    children = $(this).find('td')
                title = $(children[0])
                    .find('a')
                    .text()
                href =
                    'https://bbs.125.la/' +
                    $(children[0])
                        .find('a')
                        .attr('href')
                price = $(children[1])
                    .find('b')
                    .text()
                data.push({ title, href, price })
            }
        })
    obj.data = data
    obj.count = data.length
    return obj
}

function getOrderList(page) {
    return axios
        .get('https://bbs.125.la/plugin.php?id=e3600%3Atask&mod=show&type=1&page=' + page, {
            responseType: 'arraybuffer',
            headers: {
                Cookie:
                    'lDlk_ecc9_saltkey=Wt1xDjT9; lDlk_ecc9_lastvisit=1524101634; lDlk_ecc9_client_created=1524377343; lDlk_ecc9_client_token=CF02A441F8329948CCB697E87C38379B; lDlk_ecc9_auth=f8ackxNQODjW8l2HXoHMwnFQyZXOTQm0Zv9gItDWz1RrHc498m2NqGFYczpBudvunLtHYB15e%2B00hj264Cjjk8jOpEA; lDlk_ecc9_connect_login=1; lDlk_ecc9_connect_is_bind=1; lDlk_ecc9_connect_uin=CF02A441F8329948CCB697E87C38379B; lDlk_ecc9_smile=4D1; lDlk_ecc9_nofavfid=1; Hm_lvt_fa32dadde3745af309b587b38d20ea1d=1525084065,1525084128,1525084928,1525232790; lDlk_ecc9_ulastactivity=7df1pgQtPg6L7TSbNIVheIkv2rYX9IG7moHVjoFjafF%2FAXbLua%2By; lDlk_ecc9_lastcheckfeed=273526%7C1525311690; lDlk_ecc9_sid=eEQieI; lDlk_ecc9_lip=106.114.192.164%2C1525311601; lDlk_ecc9_creditnotice=0D0D0D0D1D0D0D0D0D273526; lDlk_ecc9_creditbase=0D0D0D0D25D21D0D0D5; lDlk_ecc9_creditrule=%E6%AF%8F%E5%A4%A9%E7%99%BB%E5%BD%95; lDlk_ecc9_lastact=1525484510%09plugin.php%09show'
            }
        })
        .then(res => iconv.decode(Buffer.from(res.data), 'gbk'))
        .then(data => JSON.parse(data))
}

module.exports = { getOrders }
