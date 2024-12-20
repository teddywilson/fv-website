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
      return (
        <IndexPage
          shows={data.allCalendarCsv.nodes}
          text={data.allTextCsv.nodes}
        />
      )
    }}
  />
)

const IndexPage = ({ shows, text }) => (
  <div>
    <h1>FAMILY VISION</h1>
    <div className="subheading">
      CONTACT: FAMILYVISIONTHEBAND@GMAIL.COM
      <br></br>
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
                year !== new Date(shows[i - 1].date).getFullYear()) && (
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
)
