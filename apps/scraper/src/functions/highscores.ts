import { Handler } from '@netlify/functions'
import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

const handler: Handler = async (event, context) => {
  const params = new URLSearchParams()
  params.append('world', 'Venebra')
  params.append('beprotection', '-1')
  params.append('profession', '0')
  params.append('category', '6')

  const tibiaResponse = await fetch(
    'https://www.tibia.com/community/?subtopic=highscores',
    {
      method: 'POST',
      body: params,
    },
  )
  const data = await tibiaResponse.text()

  const $ = cheerio.load(data)

  const items = [] as object[]

  $(
    '#highscores > div.Border_2 > div > div > div > table > tbody > tr > td > div > table > tbody > tr:nth-child(1) > td > div > table > tbody > tr',
  ).each((index, element) => {
    if (index === 0) return

    const tds = $(element).find('td')
    items.push({
      rank: $(tds[0]).text(),
      name: $(tds[1]).text(),
      vocation: $(tds[2]).text(),
      world: $(tds[3]).text(),
      level: $(tds[4]).text(),
      points: $(tds[5]).text(),
    })
  })

  return {
    statusCode: 200,
    body: JSON.stringify({
      status: 'OK',
      items,
    }),
  }
}

export { handler }
