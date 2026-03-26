import fs from "fs"
import path from "path"
import Head from "next/head"
import Papa from "papaparse"

const glyphs = ["⟡", "✦", "◇", "△", "→", "⌐", "¬", "↗", "▸", "⊹"]

const ShowEntry = ({ show, shows, i, yearGlyphs }) => {
  let date = new Date(show.date)
  let year = date.getFullYear()
  let isNewYear = i == 0 || year !== new Date(shows[i - 1].date).getFullYear()
  return (
    <div key={i}>
      {isNewYear && (
        <div className="date-header">
          {glyphs[yearGlyphs[year] % glyphs.length]} {year}
        </div>
      )}
      <div className="show-container">
        <div className="show-date">
          {date.toLocaleDateString("en", {
            month: "2-digit",
            day: "2-digit",
          })}
        </div>
        <div className="show-content">
          {show.venue} – {show.location} · {show.bands}
        </div>
      </div>
    </div>
  )
}

export default function IndexPage({ shows, text, yearGlyphs }) {
  return (
    <>
      <Head>
        <title>Family Vision</title>
        <meta name="description" content="Family Vision Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Family Vision</h1>
        <div className="subheading">
          familyvisiontheband@gmail.com
          <br />
          <a href={text[0].link}>{text[0].text}</a>
        </div>
        <ul>
          {shows.length > 0 &&
            shows.map((show, i) => (
              <ShowEntry
                key={i}
                show={show}
                shows={shows}
                i={i}
                yearGlyphs={yearGlyphs}
              />
            ))}
        </ul>
        <div className="footer">· · ·</div>
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

  let yearCount = 0
  let seenYears = {}
  calendar.forEach(s => {
    let y = new Date(s.date).getFullYear()
    if (!seenYears[y] && seenYears[y] !== 0) {
      seenYears[y] = yearCount
      yearCount++
    }
  })

  return {
    props: {
      shows: calendar,
      text,
      yearGlyphs: seenYears,
    },
  }
}
