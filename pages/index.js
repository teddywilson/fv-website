import fs from "fs"
import path from "path"
import Head from "next/head"
import Papa from "papaparse"

export default function IndexPage({ shows, text }) {
  return (
    <>
      <Head>
        <title>Family Vision</title>
        <meta name="description" content="Family Vision Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <h1>FAMILY VISION</h1>
        <div className="subheading">
          CONTACT: FAMILYVISIONTHEBAND@GMAIL.COM
          <br />
          <a href={text[0].link}>{text[0].text}</a>
        </div>
        <ul>
          {shows.length > 0 &&
            shows.map((show, i) => {
              let date = new Date(show.date)
              let year = date.getFullYear()
              return (
                <div key={i}>
                  {(i == 0 ||
                    year !==
                      new Date(shows[i - 1].date).getFullYear()) && (
                    <div className="date-header">{year}</div>
                  )}
                  <div className="show-container">
                    <div className="show-date">
                      [
                      {date.toLocaleDateString("en", {
                        month: "2-digit",
                        day: "2-digit",
                      })}
                      ]
                    </div>
                    <div className="show-content">
                      @ {show.venue} (<u>{show.location}</u>) <em>with</em>{" "}
                      {show.bands}
                    </div>
                  </div>
                </div>
              )
            })}
        </ul>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const dataDir = path.join(process.cwd(), "src/data")

  const calendarCsv = fs.readFileSync(
    path.join(dataDir, "calendar.csv"),
    "utf8"
  )
  const textCsv = fs.readFileSync(path.join(dataDir, "text.csv"), "utf8")

  const calendar = Papa.parse(calendarCsv, { header: true }).data.filter(
    row => row.date
  )
  const text = Papa.parse(textCsv, { header: true }).data.filter(
    row => row.text
  )

  calendar.sort((a, b) => new Date(b.date) - new Date(a.date))

  return {
    props: {
      shows: calendar,
      text,
    },
  }
}
