'use strict';
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
    $('table tbody').children().each(function (i, el){
        if ($(this).find('td').length > 0) {
            let href, title, price, children = $(this).find('td')
            title = $(children[0]).find('a').text()
            href = "https://bbs.125.la/" + $(children[0]).find('a').attr('href') 
            price = $(children[1]).find('b').text()
            data.push({ title, href, price})
        }
    })
    obj.data = data
    obj.count = data.length
    return Promise.resolve(obj)
}


function getOrderList(page) {
    return new Promise((resolve, reject) => {
        axios.get("https://bbs.125.la/plugin.php?id=e3600%3Atask&mod=show&type=1&page=" + page + "&a=" + new Date().getTime(), {
            responseType: 'arraybuffer'
        })
            .then(res => iconv.decode(Buffer.from(res.data), 'gbk'))
            .then(data => JSON.parse(data))
            .then(data => resolve(data))
            .catch(e => reject(e.message))
    })
}

module.exports = { getOrders }