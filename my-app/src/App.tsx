import { RecipeItem } from "Components/RecipeItem/RecipeItem";
import GlobalStyle from "global.style";
import { IRecipe, IUser } from "Interfaces/GlobalInterfaces";
import React, { useState } from "react";
import { scrapper } from "./Utility/Scrapper";
import CreateUser from "./Components/CreateUser/CreateUser";
import { UserList } from "./Components/UserList/UserList";
import { AppService } from "./Services/app.service";
import DisplayBoard from "Components/DisplayBoard/DisplayBoard";

function App() {
  const [recipe, setRecipe] = useState<IRecipe>();
  const [recipeUrl, setRecipeUrl] = useState("");
  const fetchData = async () => {
    if (recipeUrl) {
      const data = await scrapper(recipeUrl);
      setRecipe(data);
    }
  };

  const appService = new AppService();

  const [user, setUser] = useState<IUser>();
  const [users, setUsers] = useState<IUser[]>([]);
  const [numberOfUsers, setNumberOfUsers] = useState(0);

  const createUser = async (e: any) => {
    const response = await appService.createUser(user);
    console.log(response);
    setNumberOfUsers(numberOfUsers + 1);
  };

  const getAllUsers = async () => {
    const users = await appService.getUsers();
    setUsers(users);
    setNumberOfUsers(users.length);
  };

  const onChangeForm = (e: any) => {
    let userClone: any = { ...user };
    if (e.target.name === "firstname") {
      userClone.firstName = e.target.value;
    } else if (e.target.name === "lastname") {
      userClone.lastName = e.target.value;
    } else if (e.target.name === "email") {
      userClone.email = e.target.value;
    }
    setUser(userClone);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeUrl(e.target.value);
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
      <div className="row">
        <div className="col-md-8">
          <CreateUser onChangeForm={onChangeForm} createUser={createUser} />
        </div>
        <div className="col-md-4">
          <DisplayBoard
            numberOfUsers={numberOfUsers}
            getAllUsers={getAllUsers}
          />
        </div>
      </div>
      <div className="row mrgnbtm">
        <UserList users={users}></UserList>
      </div>
    </>
  );
}

export default App;
