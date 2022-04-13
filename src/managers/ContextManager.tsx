import { createContext, useEffect, useState } from "react";

const UserAuthContext = createContext({
  state: {
    logged: "yes",
    id: 1,
    username: "janek_kowalski",
    roles: ["ROLE_CLIENT_MAKER"],
    email: "janek_kowalski@wp.com",
    image: null,
    first_name: "test",
    last_name: "Kowalski",
    birth_date: "21.01.1998",
    phone: "123-456-789",
    city: "Poznań",
    state: "Wielkopolskie",
    country: "Polska"
  },
  setState: (s: any) => {}
});
const UserAuthConsumer = UserAuthContext.Consumer;

const UserAuthController = ({ children }) => {
  const [state, setState] = useState({
    logged: "load"
  });
  return (
    <UserAuthContext.Provider value={{ state, setState }}>
      {children}
    </UserAuthContext.Provider>
  );
};

const ContextCombiner = ({ children }) => {
  return <UserAuthController>{children}</UserAuthController>;
};

export default ContextCombiner;
export { UserAuthContext };
export { UserAuthConsumer };
