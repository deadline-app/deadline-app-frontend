
import React, { useEffect, useState } from 'react'
import '../index.css'
import { Card, CardLink } from '../components/Card';
import CreateCardForm from '../components/CreateCardForm';
import OpenMenuButton from '../components/OpenMenuButton';

const Home = () => {
  // API call
  const apiURL = 'http://localhost:8080/cards/';
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
              <CardLink
                color={card.color}
                style={{ display: card.task_info_link ? "block" : "none" }}
                href={card.task_info_link}
              >
                Условия &rarr;
              </CardLink>
              <CardLink
                color={card.color}
                style={{ display: card.task_submission_link ? "block" : "none" }}
                href={card.task_submission_link}
              >
                Сдать &rarr;
              </CardLink>
              <CardLink
                color={card.color}
                style={{ display: card.task_enrollment_link ? "block" : "none" }}
                href={card.task_enrollment_link}
              >
                Запись на сдачу &rarr;
              </CardLink>
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

  // make card appear
  const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

  return (
    <>
    <section className='relative isolate w-full min-h-[100vh] bg-neutral-900 py-[50px] overflow-hidden'>
      <div
        className="absolute -inset-x-2 top-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-40"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-1rem)] aspect-[8/6] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#f3e761] to-[#c13fe8] opacity-30 sm:left-[calc(50%-3rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <h1 className='font-bold text-white text-2xl text-center px-[30px]'>IS y-25 <span className='font-normal'>deadlines app</span></h1>
      <h2 className='font-bold text-white text-md text-center px-[30px]'>Powered by <span className='font-normal'>@zdarovayrodi & @annsemen</span></h2>
      <div className='flex flex-1 overflow-x-scroll scrollbar-hide hide-scrollbar mt-12'>  
        {showCards}
      </div>
    </section>
      <CreateCardForm isOpen={isOpen} toggle={toggle}/>
    <OpenMenuButton toggle={toggle} />
    </>
  )
}

export default Home;