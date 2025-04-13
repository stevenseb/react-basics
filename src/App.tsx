import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// Define the User type
interface User {
  id: number;
  firstName: string;
  lastName: string;
  joinDate: string;
  contributor: boolean;
  proMember: boolean;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  // State for modal and new user form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Could not fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    }); // Reset form fields
  };

  const handleSaveUser = async () => {
    try {
      // Send new user data to backend
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to save user");
      }

      const savedUser = await response.json();

      // Update state with newly added user
      setUsers((prevUsers) => [...prevUsers, savedUser]);

      // Close modal after saving
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = () => {
    let sortedUsers;

    if (sortOrder === "asc") {
      sortedUsers = [...users].sort((a, b) =>
        b.lastName.localeCompare(a.lastName)
      );
      setSortOrder("desc");
    } else {
      sortedUsers = [...users].sort((a, b) =>
        a.lastName.localeCompare(b.lastName)
      );
      setSortOrder("asc");
    }
    setUsers(sortedUsers);
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Eric's React Basics Practice</h1>
      <p>
        This project is a collection of various components used to practice and
        become more proficient in REACT code. The project is created using VITE
        for the frontend server and a docker-compose container for a postgres db
        instance for the backend server. Thank you for visiting!
      </p>
      <button onClick={handleAddUser}>Add a New User</button>
      <div className="card">
        <h2>Current Users:</h2>
        <h4>Total: {users.length}</h4>
        <button className="sort-button" onClick={handleSort}>
          Sort By Last Name{" "}
          <span className={`arrow up ${sortOrder === "desc" ? "active" : ""}`}>
            ▲
          </span>
          <span className={`arrow down ${sortOrder === "asc" ? "active" : ""}`}>
            ▼
          </span>
        </button>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <br />
              {user.firstName} {user.lastName}
              <br />
              Joined: {user.joinDate.slice(0, 10)}
              <br />
              Contributor: {user.contributor ? " Yes" : " No"}
              <br />
              Pro Member: {user.proMember ? " Yes" : " No"}
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New User</h2>
            <form autoComplete="false">
            <input type="text" name="hidden" autoComplete="false" style={{ display: "none" }} />
            </form>
            <label>
              First Name:
              <input
                type="text"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
              />
            </label>
            <label>
                Email:
                <input
                type="email"
                name="user_email" // Use a non-standard name
                autoComplete="off"
                value={newUser.email}
                onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.           value })
                }
                />
            </label>
            <label>
                Password:
                <input
                type="password"
                name="user_password" // Use a non-standard name
                autoComplete="new-password"
                value={newUser.password}
                onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.            value })
                }
                />
            </label>
            <button onClick={handleSaveUser}>Save</button>
            <button onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
