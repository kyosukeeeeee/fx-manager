import styles from './DashBoardPage.module.scss'

export const DashBoardPage = () => {
  const DAY_OF_THE_WEEK: string[] = ['日', '月', '火', '水', '木', '金', '土']

  const today: Date = new Date()
  const year: number = today.getFullYear()
  const month: number = today.getMonth()
  const firstDay: Date = new Date(year, month, 1)
  const lastDay: Date = new Date(year, month + 1, 0)
  const firstWeek: number = firstDay.getDay()
  const lastDate: number = lastDay.getDate()

  // カレンダーの日付配列を生成
  const generateCalendarDays = (): (number | null)[][] => {
    const weeks: (number | null)[][] = []
    let day = 1

    for (let i = 0; i < 6; i++) {
      const week: (number | null)[] = []

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstWeek) {
          week.push(null)
        } else if (day > lastDate) {
          week.push(null)
        } else {
          week.push(day)
          day++
        }
      }

      weeks.push(week)
    }

    return weeks
  }

  const calendarDays = generateCalendarDays()

  return (
    <>
      <h1>ダッシュボード</h1>
      <div>
        <p>{today.toString()}</p>
        <table className={styles.table}>
          <thead>
            <tr>
              {DAY_OF_THE_WEEK.map((dotw) => <th key={dotw}>{dotw}</th>)}
            </tr>
          </thead>
          <tbody>
            {calendarDays.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) => (
                  <td key={dayIndex}>
                    {day !== null ? day : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}