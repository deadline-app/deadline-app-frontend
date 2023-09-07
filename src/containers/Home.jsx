
import React, { useEffect, useRef, useState } from 'react'
import '../index.css'
import { Card } from '../components/Card';

const Home = () => {
  // API call
  const apiURL = 'http://localhost:3001/cards/';
  const [showCards, setShowCards] = useState();

  let displayData

  function groupByDate(cards) {
    const groupedData = {};
    cards.forEach(card => {
      const deadlineDate = new Date(card.deadline);
      const date = deadlineDate.toISOString().split('T')[0]; // ISO-строка для правильного формата даты
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(card);
    });
  
    const sortedDates = Object.keys(groupedData).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    });
  
    return sortedDates.reduce((result, date) => {
      result[date] = groupedData[date];
      return result;
    }, {});
  }  
  

  async function pullJson() {
    const response = await fetch(apiURL)
    const responseData = await response.json()
    const groupedData = groupByDate(responseData)

    // Сортировка дат в хронологическом порядке
    const sortedDates = Object.keys(groupedData).sort()

    displayData = sortedDates.map(date => {
      const cards = groupedData[date]

      // for the date above cards
      const displayDate = new Date(date)
      const formattedDisplayDate = displayDate.toLocaleDateString('ru-RU', { weekday: 'short', month: 'long', day: 'numeric' })

      const cardElements = cards.map(card => {
        const deadlineDate = new Date(card.deadline)
        const formattedDate = deadlineDate.toLocaleDateString()
        const formattedTime = deadlineDate.toLocaleTimeString()

        return (
          <Card key={card.id}
               bgcolor={`${card.color}`}
               className={`w-[300px] bg-opacity-30 rounded-lg shadow py-4 px-6 text-white inline-block mx-4`}>
            <p className='text-lg font-bold'>{card.subject}</p>
            <p className=''>{card.task_name}</p>
            <div className='flex flex-row gap-2 mt-2'>
              <p style={{border: "1px solid " + card.color,
                         backgroundColor: card.color + "40",
                        }} className='inline-flex items-center rounded-md px-2 py-1 text-xs font-medium'>{formattedDate}</p>
              <p style={{border: "1px solid " + card.color,
                         backgroundColor: card.color + "40",
                        }} className='inline-flex items-center rounded-md px-2 py-1 text-xs font-medium'>{formattedTime}</p>
            </div>
            <div className='flex flex-col mt-2'>
              <a style={{color: `${card.color}`}} href={card.task_info_link}>Условия &rarr;</a>
              <a style={{color: `${card.color}`}} className={card.task_submission_link === null ? "hidden" : ""} href={card.task_submission_link}>Сдать &rarr;</a>
              <a style={{color: `${card.color}`}} className={card.task_enrollment_link === null ? "hidden" : ""} href={card.task_enrollment_link}>Запись на сдачу &rarr;</a>
            </div>
          </Card>
        )
      })

      return (
        <div key={date} className="flex flex-col gap-2">
          <p className="font-bold text-white ml-8">{formattedDisplayDate}</p>
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
    <section className='w-full min-h-[100vh] bg-neutral-900 py-[50px]'>
      <h1 className='font-bold text-white text-2xl text-center px-[30px]'>IS y-25 <span className='font-normal'>deadlines app</span></h1>
      <h2 className='font-bold text-white text-md text-center px-[30px]'>Powered by <span className='font-normal'>@zdarovayrodi & @annsemen</span></h2>
      <div className='flex flex-1 overflow-x-scroll scrollbar-hide hide-scrollbar mt-12'
          // onWheel={(e) => {
          //   // here im handling the horizontal scroll inline, without the use of hooks
          //   const strength = Math.abs(e.deltaY);
          //   if (e.deltaY === 0) return;

          //   const el = e.currentTarget;
          //   if (
          //     !(el.scrollLeft === 0 && e.deltaY < 0) &&
          //     !(
          //       el.scrollWidth -
          //         el.clientWidth -
          //         Math.round(el.scrollLeft) ===
          //         0 && e.deltaY > 0
          //     )
          //   ) {
          //     e.preventDefault();
          //   }
          //   el.scrollTo({
          //     left: el.scrollLeft + e.deltaY,
          //     // large scrolls with smooth animation behavior will lag, so switch to auto
          //     behavior: strength > 70 ? "auto" : "smooth",
          //   });
          // }}
      >  
        {showCards}
      </div>
    </section>
  )
}

export default Home;