import React, { useState } from "react";

import TutorialDataService from "../../services/dbservice";


const InsertItem = () => {
  const initialTutorialState = {
    category: "",
    title: "",
    description: "",
    extradetail: "",
    price: 0,
    image:"",
    published: false
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);
  const [notEnoughInfo, setInfo] = useState(false)
  const mssg = "Debes de ingresar por lo menos categoría, nombre y precio";

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
    setInfo(false);
  };
  const saveTutorial = () => {
    if (tutorial.title === "" || tutorial.price === 0) {
      setInfo(true);
      return;
    }
    var data = {
      category: tutorial.category,
      title: tutorial.title,
      description: tutorial.description,
      extradetail: tutorial.extradetail,
      published: false
    };

    TutorialDataService.create(data)
      .then(() => {
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (

    <div className="submit-form">
      {submitted ? (
        <>
          <div>
            <h4>Haz añadido exitosamente el elemento</h4>
            <button className="btn btn-success" onClick={newTutorial}>
              Añadir otro item al menu
            </button>
          </div>

        </>
      ) : (
          <div>
            <div className="form-group">
              <label htmlFor="category">Categoría</label>
              <input
                type="text"
                className="form-control"
                id="category"
                required
                value={tutorial.category}
                onChange={handleInputChange}
                name="category"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={tutorial.title}
                onChange={handleInputChange}
                name="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={tutorial.description}
                onChange={handleInputChange}
                name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Detalles adicionales</label>
              <input
                type="text"
                className="form-control"
                id="extradetail"
                required
                value={tutorial.extradetail}
                onChange={handleInputChange}
                name="extradetail"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Precio</label>
              <input
                type="text"
                className="form-control"
                id="price"
                required
                value={tutorial.price}
                onChange={handleInputChange}
                name="price"
              />
            </div>
            <button onClick={saveTutorial} className="btn btn-success">
              Submit
          </button>
            {notEnoughInfo && <h3>{mssg}</h3>}
          </div>
        )}
    </div>
  );
};

export default InsertItem;
