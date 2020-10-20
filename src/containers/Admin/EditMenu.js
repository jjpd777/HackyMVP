import React, { useState /* useEffect */ } from "react";
import { useList } from "react-firebase-hooks/database";
import TutorialDataService from "../../services/dbservice";
import Tutorial from "./Helper";

const EditMenu = (thislist) => {
  // const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  /* use react-firebase-hooks */
  const [tutorials, loading, error] = useList(TutorialDataService.getAll());

  /* manually listen for value events
  const onDataChange = (items) => {
    let tutorials = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      tutorials.push({
        key: key,
        title: data.title,
        description: data.description,
        published: data.published,
      });
    });

    setTutorials(tutorials);
  };

  useEffect(() => {
    TutorialDataService.getAll().on("value", onDataChange);

    return () => {
      TutorialDataService.getAll().off("value", onDataChange);
    };
  }, []);
  */

  const refreshList = () => {
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    //   console.log(tutorial.val())
    const { category,title, description, published, price, extradetail } = tutorial.val(); /* tutorial */
    console.log("tutorial.key")
    console.log(tutorial.key)
    setCurrentTutorial({
      key: tutorial.key,
      category,
      title,
      description,
      price,
      extradetail,
      published,
    });

    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    TutorialDataService.removeAll()
      .then(() => {
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Elementos del menu</h4>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Cargando...</span>}
        <ul className="list-group">
          {!loading &&
            tutorials &&
            tutorials.map((tutorial, index) => (
              <li
                className={"list-group-item " + (index === currentIndex ? "active" : "")}
                onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              >
                {tutorial.val().title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Borrar todo el menu
        </button>
      </div>
      <div className="col-md-6">
        {currentTutorial ? (
          <Tutorial tutorial={currentTutorial} refreshList={refreshList} />
        ) : (
          <div>
            <br />
            <p>Por favor escoja un item del menu a editar!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditMenu;
