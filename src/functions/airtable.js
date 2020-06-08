const Airtable = require("airtable")

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.API_KEY,
})
const base = Airtable.base("appJhwNPV36eDmHYA")

exports.handler = function (event, context, callback) {
  const allRecords = []
  base("Words")
    .select({
      view: "Grid view",
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          let obj = {
            Word: record.get("Word"),
            Definition: record.get("Definition"),
          }
          allRecords.push(obj)
        })
        fetchNextPage()
      },
      function done(err) {
        if (err) {
          callback(err)
        } else {
          const body = JSON.stringify(allRecords)
          const response = {
            statusCode: 200,
            body: body,
            headers: {
              "content-type": "application/json",
              "cache-control": "Cache-Control: max-age=300, public",
            },
          }
          callback(null, response)
        }
      }
    )
}
