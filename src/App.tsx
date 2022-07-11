import { RecipeItem } from "Components/RecipeItem/RecipeItem";
import GlobalStyle from "global.style";
import { IRecipe } from "Interfaces/GlobalInterfaces";
import React, { useState } from "react";
import { scrapper } from "./Utility/Scrapper";

//Start Firebase code

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  Auth,
  signInWithPopup,
} from "firebase/auth";

import { doc, setDoc, getFirestore } from "firebase/firestore";

import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyerqJxyBDedkpWvsvaHpYtokn12TfXKU",

  authDomain: "recipe-4a1e7.firebaseapp.com",

  databaseURL: "https://recipe-4a1e7-default-rtdb.firebaseio.com",

  projectId: "recipe-4a1e7",

  storageBucket: "recipe-4a1e7.appspot.com",

  messagingSenderId: "320194584700",

  appId: "1:320194584700:web:79522cf474ef2cd92c29f9",

  measurementId: "G-P1EDR3WXQ5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
//End Firebase code

function App() {
  const [recipe, setRecipe] = useState<IRecipe>();
  const [recipeUrl, setRecipeUrl] = useState("");
  const fetchData = async () => {
    if (recipeUrl) {
      const data = await scrapper(recipeUrl);
      setRecipe(data);
    }
    saveRecipe();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeUrl(e.target.value);
  };

  const SignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveRecipe = async () => {
    if (recipe) {
      await setDoc(doc(db, "Recipe", "test"), {
        name: "test",
      });
    }
  };

  return (
    <>
      {/*Global style is applied here*/}
      <GlobalStyle />
      <div className="App">
        <h1>Recipe</h1>
        <p>
          https://cuisinez.telequebec.tv/recettes/2580/pain-maison-a-la-poele
        </p>
        <p>https://lacuisineensemble.fr/que-faire-avec-de-la-viande-hachee/</p>
        <button onClick={SignIn}>Sign In</button>
        <input
          type="text"
          name="url"
          id="url"
          placeholder="Url"
          onChange={onChange}
        />

        <button onClick={fetchData}>fetch</button>
        {recipe && <RecipeItem recipe={recipe}></RecipeItem>}
      </div>
    </>
  );
}

export default App;
