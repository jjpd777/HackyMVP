import React, { useState } from "react";
import TutorialDataService from "../../services/dbservice";

const Helper = (props) => {
  const initialTutorialState = {
    id: "",
    category:"",
    name: "",
    description: "",
    brief: "",
    price: 0,
    image:"",
    published: false
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const { tutorial } = props;
  if (currentTutorial.id !== tutorial.id) {
    setCurrentTutorial(tutorial);
    setMessage("");
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updatePublished = (status) => {
    TutorialDataService.update(currentTutorial.id, { published: status })
      .then(() => {
        setCurrentTutorial({ ...currentTutorial, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateTutorial = () => {
    const data = {
      id: currentTutorial.id,
      category:currentTutorial.category,
      name: currentTutorial.name,
      description: currentTutorial.description,
      brief: currentTutorial.brief,
      price:currentTutorial.price,
    };

    TutorialDataService.update(currentTutorial.id, data)
      .then(() => {
        setMessage("The tutorial was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    console.log(currentTutorial.id)
    TutorialDataService.remove(currentTutorial.id)
      .then(() => {
        props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Platillo del menu a modificar</h4>
          <form>
          <div className="form-group">
              <label htmlFor="category">Categoría</label>
              <input
                type="text"
                className="form-control"
                id="category"
                value={currentTutorial.category}
                onChange={handleInputChange}
                name="category"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Title</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={currentTutorial.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={currentTutorial.description}
                onChange={handleInputChange}
                name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Detalles adicionales</label>
              <input
                type="text"
                className="form-control"
                id="brief"
                required
                value={currentTutorial.brief}
                onChange={handleInputChange}
                name="brief"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Precio</label>
              <input
                type="number"
                className="form-control"
                id="price"
                required
                value={currentTutorial.price}
                onChange={handleInputChange}
                name="price"
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? "Publicado en el menu" : "Pendiente de publicación"}
            </div>
          </form>

          {currentTutorial.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              Dejar de Publicar
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publicar en el menu
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTutorial}
          >
            Update
          </button>
          <br></br>
          <br></br>
          <br></br>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
                <p>{message}</p>
    </div>
  );
};

export default Helper;
