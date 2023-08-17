import { useEffect, useState } from "react";
import { Loading } from "./ui/Loading";

const noImage = import.meta.env.VITE_NO_IMAGE;

const DataCard = ({ data }) => {
  const [dataWithLikes, setDataWithLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const addLikeOnClick = (id) => {
    setDataWithLikes((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  const addToFavoriteOnClick = (id) => {
    setDataWithLikes((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
    const clickedItem = dataWithLikes.find((item) => item.id === id);
    const action = !clickedItem.favorite
      ? "New favorite added!"
      : "Favorite removed!";
    console.log(action, clickedItem);
  };

  const formatData = () => {
    const modifiedData = data.map((item) => ({
      ...item,
      likes: 0,
      favorite: false,
    }));
    setDataWithLikes(modifiedData);
    setIsLoading(false);
  };

  useEffect(() => {
    formatData();
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {dataWithLikes.map((item) => (
        <div className="col" key={item.id}>
          <div className="card shadow">
            <img
              src={item.images.fixed_width_small.url || noImage}
              alt={item.title}
              width={"100%"}
              height={"230"}
            />
            <div className="card-body bg-dark border-top border-light">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <button
                    type="button"
                    className={
                      item.likes > 0
                        ? "btn btn-primary me-2"
                        : "btn btn-outline-primary me-2"
                    }
                    onClick={() => addLikeOnClick(item.id)}
                  >
                    <i className="bi bi-hand-thumbs-up-fill"></i>
                    <span className="badge">{item.likes}</span>
                  </button>
                  <button
                    type="button"
                    className={
                      item.favorite
                        ? "btn btn-danger"
                        : "btn btn-outline-danger"
                    }
                    onClick={() => addToFavoriteOnClick(item.id)}
                  >
                    <i
                      className={
                        item.favorite ? "bi bi-heart-fill" : "bi bi-heart"
                      }
                    ></i>
                  </button>
                </div>
                <button className="btn btn-outline-warning">
                  <i className="bi bi-share-fill"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DataCard;
