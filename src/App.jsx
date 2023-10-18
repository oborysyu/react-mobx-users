import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { USERS_API } from "./config";
import { useUsersStore } from "./store/userStore";
import UsersList from "./components/UsersList/UsersList";
import "./App.css";

const App = observer(() => {
  
  const handleAddUser = () => {
    userStore.addUser(Date.now(), "John Doe", "unknown");
  };

  const userStore = useUsersStore();
  useEffect(() => {
    //here we try to get list of users
    fetch(USERS_API)
      .then((response) => response.json())
      .then((json) => {
        //here we save only the user fields we need
        const userList = json;
        userList.forEach((user) => {
          userStore.addUser(user.id, user.name.toString(), user.username);
        });
      })
      .catch((error) => {
        console.error("Error>>>", error);
      });
  }, []);

  return (
    <>
      <button className="add_button" onClick={handleAddUser}>
        Add new user
      </button>
      <UsersList list={userStore.users} />
    </>
  );
});

export default App;
