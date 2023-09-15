import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { IoClose } from "react-icons/io5";

const CreateCardForm = ({ isOpen, toggle }) => {
  const [formData, setFormData] = useState({
    subject: "",
    task_name: "",
    color: "",
    deadline: "",
    time: "",
    task_info_link: "",
    task_submission_link: "",
    task_enrollment_link: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
        // Create a new Date object with the date and time from the form
      const date = new Date(`${formData.deadline}T${formData.time}:00.000Z`);

      // Set the timezone offset to UTC+3 (180 minutes ahead of UTC)
      date.setMinutes(date.getMinutes() - 180);

      // Format the date and time as a string in ISO format
      const dateTimeString = date.toISOString();
      // Create the data object with the combined datetime
      const requestData = {
        subject: formData.subject,
        task_name: formData.task_name,
        color: formData.color,
        deadline: dateTimeString,
        task_info_link: formData.task_info_link,
        task_submission_link: formData.task_submission_link,
        task_enrollment_link: formData.task_enrollment_link,
      };
      
      console.log(requestData)

      // Send a POST request with formData to your backend server
      const response = await axios.post("http://localhost:8080/cards", requestData);
      
      // Handle the response as needed (e.g., show a success message)
      console.log("Response:", response);

      // Reset the form data after successful submission
      setFormData({
        subject: "",
        task_name: "",
        color: "",
        deadline: "",
        time: "",
        task_info_link: "",
        task_submission_link: "",
        task_enrollment_link: "",
      });

      // Close the form
      toggle();
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggle = () => {
    // empty form fields
    setFormData({
      subject: "",
      task_name: "",
      color: "",
      deadline: "",
      time: "",
      task_info_link: "",
      task_submission_link: "",
      task_enrollment_link: "",
    });
    toggle();
  };

  return (
    <div
      className={
        isOpen
          ? "fixed z-50 top-0 left-0 right-0 flex flex-col justify-center items-center h-[100vh] opacity-100 transition-all duration-500 ease-in-out"
          : "fixed z-50 top-[-100%] left-0 right-0 flex flex-col justify-center items-center h-[100vh] opacity-0 transition-all duration-500 ease-in-out"
      }
      isOpen={isOpen}
      // onClick={toggle}
    >
      <div class="!z-5 flex flex-col rounded-md gap-4 max-w-[300px] md:max-w-[400px] bg-neutral-700 shadow bg-clip-border shadow-3xl shadow-shadow-500 w-full !p-6 3xl:p-![18px] undefined">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-xl text-neutral-200 font-bold">Новый дедлайн</h1>
          <IoClose className="text-2xl text-neutral-200 font-bold float-right cursor-pointer" onClick={handleToggle} />
        </div>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Предмет"
            className="mb-3"
          >
            <Form.Control placeholder="Программирование"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPassword"
            label="Задание"
            className="mb-3"
          >
            <Form.Control placeholder="1 лабораторная работа"
              type="text"
              name="task_name"
              value={formData.task_name}
              onChange={handleChange}
              />
          </FloatingLabel>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check label="Цвет"
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Сделать до">
            <Form.Check label="Дата"
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Время">
            <Form.Check label="Время"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </Form.Group>

          <FloatingLabel
            controlId="floatingInput"
            label="Ссылка на условия"
            className="mb-3"
          >
            <Form.Control placeholder="https://..."
              type="text"
              name="task_info_link"
              value={formData.task_info_link}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Ссылка на сдачу"
            className="mb-3"
          >
            <Form.Control placeholder="https://..." 
              type="text"
              name="task_submission_link"
              value={formData.task_submission_link}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Ссылка на запись на защиту"
            className="mb-3"
          >
            <Form.Control placeholder="https://..." 
              type="text"
              name="task_enrollment_link"
              value={formData.task_enrollment_link}
              onChange={handleChange}
            />
          </FloatingLabel>
        <button className="py-2 px-5 rounded-md bg-blue-200 inline-block" type="submit">
          Отправить
        </button>
        </Form>

      </div>
    </div>
  );
};

export default CreateCardForm;
