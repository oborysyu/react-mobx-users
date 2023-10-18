import { observer } from "mobx-react-lite";
import { useUsersStore } from "../../store/userStore";
import "./UserItem.css";

const UserItem = observer(({ user }) => {
  const userStore = useUsersStore();

  const handleRemoveUser = () => {
    userStore.removeUser(user);
  };

  const handleEditUser = () => {
    userStore.toggleEdit(user);
  };

  return (
    <div className="user_item">
      {user.isChanging ? (
        <>
          <input
            type="text"
            value={user.editedName}
            onChange={(e) => user.setName(e.target.value)}
          />
          <br />
          <button onClick={() => userStore.updateName(user)}>Save</button>
        </>
      ) : (
        <>
          <p>
            <b>{user.name}</b>
          </p>
          <p>
            <i>{user.username}</i>
          </p>
          <hr />
          <button disabled={user.isBlocked} onClick={handleEditUser}>
            Edit
          </button>
          <button
            onClick={() => {
              user.toggleBlock();
            }}
          >
            {user.isBlocked ? "Unblock user" : "Block user"}
          </button>
          <button disabled={user.isBlocked} onClick={handleRemoveUser}>
            Remove user
          </button>
        </>
      )}
    </div>
  );
});

export default UserItem;
