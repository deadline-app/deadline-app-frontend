
import React, { useEffect, useState } from 'react'
import '../index.css'

const Home = () => {
  const apiURL = 'http://localhost:3001/cards/';
  const [showCards, setShowCards] = useState();

  let displayData

  // Функция для группировки карточек по дате
  function groupByDate(cards) {
    const groupedData = {}
    cards.forEach(card => {
      const deadlineDate = new Date(card.deadline)
      const date = deadlineDate.toLocaleDateString()
      if (!groupedData[date]) {
        groupedData[date] = []
      }
      groupedData[date].push(card)
    })
    return groupedData
  }

  async function pullJson() {
    const response = await fetch(apiURL)
    const responseData = await response.json()
    const groupedData = groupByDate(responseData)

    // Сортировка дат в хронологическом порядке
    const sortedDates = Object.keys(groupedData).sort()

    displayData = sortedDates.map(date => {
      const cards = groupedData[date]
      const cardElements = cards.map(card => {
        const deadlineDate = new Date(card.deadline)
        const formattedDate = deadlineDate.toLocaleDateString()
        const formattedTime = deadlineDate.toLocaleTimeString()

        return (
          <div key={card.id} className={`min-w-[300px] bg-[${card.color}30] rounded shadow py-8 px-4 text-white inline-block`}>
            <p className='text-lg font-bold'>{card.subject}</p>
            <p className='text-md font-semibold'>{card.task_name}</p>
            <p>{formattedDate}</p>
            <p>{formattedTime}</p>
            <p>{card.task_info_link}</p>
            <p>{card.task_submission_link}</p>
            <p>{card.task_enrollment_link}</p>
          </div>
        )
      })

      return (
        <div key={date} className="flex flex-col gap-2">
          <p className="font-bold text-white">{date}</p>
          {cardElements}
        </div>
      )
    })
    setShowCards(displayData)
  }

  useEffect(() => {
    pullJson()
  }, [])

  return (
    <section className='w-full min-h-[100vh] bg-neutral-900 py-[50px] px-[30px]'>
      <h1 className='font-bold text-white text-2xl text-center'>IS y-25 <span className='font-normal'>deadlines app</span></h1>
      <h2 className='font-bold text-white text-md text-center'>Powered by <span className='font-normal'>@zdarovayrodi & @annsemen</span></h2>
      <div className='flex gap-2 flex-1 overflow-x-scroll hide-scrollbar mt-12'>  
        {showCards}
      </div>
    </section>
  )
}

export default Home;
