// import logo from "./logo.svg";
import "./App.css";
import Auth from "./components/auth";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movielist, setMovielist] = useState([]);

  const moviesCollection = collection(db, "movies");

  //new movie  States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isnewMovieOscar, setIsnewMovieOscar] = useState(false);
  //update title state
  const [updateTitle, setUpdateTitle] = useState("");

  //upload file state
  const [fileUpload, setFileUpload] = useState(null);
  const getMovieList = async () => {
    //read the data
    //set the movie list
    try {
      const data = await getDocs(moviesCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setMovielist(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const submitMovie = async () => {
    try {
      await addDoc(moviesCollection, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isnewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  const updateMovieTitle = async (id, updateTitle) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updateTitle });
  };

  const uploadFile = async () => {
    if (!fileUpload) {
      return;
    }
    const fileFolderRef = ref(storage, `projectfiles/${fileUpload.name}`);
    try {
      await uploadBytes(fileFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Auth />

      <div>
        <input
          type="text"
          placeholder="MOvie Title"
          onChange={(e) => {
            setNewMovieTitle(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="release Date"
          onChange={(e) => {
            setNewReleaseDate(Number(e.target.value));
          }}
        />
        <input
          type="checkbox"
          onChange={(e) => {
            setIsnewMovieOscar(e.target.checked);
          }}
        />
        <label htmlFor="">Recied An Oscar</label>
        <button onClick={submitMovie}>Submit Movie</button>
        {/* <button onClick={getMovieList}>Get Movie</button> */}
      </div>

      <div>
        {movielist.map((movie) => {
          return (
            <div key={movie.id}>
              <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
                {movie.title}
              </h1>
              <p>Date: {movie.releaseDate}</p>

              <button onClick={() => deleteMovie(movie.id)}>
                Delete Movie
              </button>

              <input
                type="text"
                placeholder="update title"
                onChange={(e) => {
                  setUpdateTitle(e.target.value);
                }}
              />
              <button onClick={() => updateMovieTitle(movie.id, updateTitle)}>
                Update Title
              </button>
            </div>
          );
        })}
      </div>
      <br />
      <br />
      <div>
        <input
          type="file"
          name=""
          id=""
          onChange={(e) => {
            setFileUpload(e.target.files[0]);
          }}
        />
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </div>
  );
}

export default App;
