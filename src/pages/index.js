import React from "react"

import { StaticQuery, graphql } from "gatsby"

export default () => (
  <StaticQuery
    query={graphql`
      query AllCalendar {
        allCalendarCsv {
          nodes {
            ...CalendarCsvFragment
          }
        }
        allTextCsv {
          nodes {
            ...TextCsvFragment
          }
        }
      }
    `}
    render={data => {
      data.allCalendarCsv.nodes.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      })

      let yearCount = 0
      let seenYears = {}
      data.allCalendarCsv.nodes.forEach(s => {
        let y = new Date(s.date).getFullYear()
        if (!seenYears[y]) {
          seenYears[y] = yearCount
          yearCount++
        }
      })

      return (
        <IndexPage
          shows={data.allCalendarCsv.nodes}
          text={data.allTextCsv.nodes}
          yearGlyphs={seenYears}
        />
      )
    }}
  />
)

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

const IndexPage = ({ shows, text, yearGlyphs }) => (
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
)
