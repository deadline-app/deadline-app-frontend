import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const CreateCardForm = ({ isOpen, toggle }) => {
  return (
    <div
      className={
        isOpen
          ? "fixed z-50 top-0 left-0 right-0 flex flex-col justify-center items-center h-[100vh] opacity-100 transition-all duration-500 ease-in-out"
          : "fixed z-50 top-[-100%] left-0 right-0 flex flex-col justify-center items-center h-[100vh] opacity-0 transition-all duration-500 ease-in-out"
      }
      isOpen={isOpen}
      onClick={toggle}
    >
      <div class="!z-5 flex flex-col rounded-md gap-4 max-w-[300px] md:max-w-[400px] bg-neutral-700 shadow bg-clip-border shadow-3xl shadow-shadow-500 w-full !p-6 3xl:p-![18px] undefined">
        <h1 className="text-xl text-neutral-200 font-bold">Новый дедлайн</h1>
        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="Предмет"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Программирование" />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPassword"
            label="Задание"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="1 лабораторная работа" />
          </FloatingLabel>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="color" label="Цвет" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Сделать до">
            <Form.Check type="date" label="Дата" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Время">
            <Form.Check type="time" label="Время" />
          </Form.Group>

          <FloatingLabel
            controlId="floatingInput"
            label="Ссылка на условия"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="https://..." />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Ссылка на сдачу"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="https://..." />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Ссылка на запись на защиту"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="https://..." />
          </FloatingLabel>
        </Form>

        <button className="py-2 px-5 rounded-md bg-blue-200 inline-block">
          Отправить
        </button>
      </div>
    </div>
  );
};

export default CreateCardForm;
