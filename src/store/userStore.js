import { types } from "mobx-state-tree";

const User = types
  .model("User", {
    id: types.identifierNumber,
    name: types.string,
    username: types.string,
    isChanging: types.optional(types.boolean, false),
    editedName: types.optional(types.string, ""),
    isBlocked: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setName(userName) {
      self.editedName = userName;
    },
    toggleBlock() {
      self.isBlocked = !self.isBlocked;
    },
  }));

const UserStore = types
  .model("UserStore", {
    users: types.array(User),
  })
  .actions((self) => ({
    addUser(id, name, username) {
      const newUser = User.create({
        id,
        name,
        username,
      });
      self.users.push(newUser);
    },
    removeUser(user) {
      self.users.remove(user);
    },
    toggleEdit(user) {
      //for this example application we only editing user's name
      user.isChanging = !user.isChanging;
      if (user.isChanging) {
        user.setName(user.name);
      }
    },
    updateName(user) {
      user.name = user.editedName;
      user.isChanging = false;
    },
  }));

export { UserStore };

let _userStore;
export const useUsersStore = () => {
  if (!_userStore) {
    _userStore = UserStore.create({
      users: [],
    });
  }

  return _userStore;
};
