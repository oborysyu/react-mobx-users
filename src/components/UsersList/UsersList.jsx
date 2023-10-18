import { observer } from "mobx-react-lite";
import UserItem from "../UserItem/UserItem";
import "./UsersList.css";

const UsersList = observer(({ list }) => {
  return (
    <div className="users_list">
      {list?.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
});

export default UsersList;
