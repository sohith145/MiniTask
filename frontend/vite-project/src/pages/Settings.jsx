import { useState } from "react";
import { useAuth } from "../customhooks/useAuth";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import "./Settings.css";

function Settings() {
const { user,updateProfile } = useAuth();
console.log(user);
const [isEditing, setIsEditing] = useState(false);
const [name, setName] = useState(user?.name || "");

const handleEdit = () => {
setName(user?.name || "");
setIsEditing(true);
};

const handleCancel = () => {
setName(user?.name || "");
setIsEditing(false);
};



 const handleSave = async (event) => {
    event.preventDefault();
    try{
        const data= await updateProfile({name});
        console.log(data)
        setIsEditing(false);
    }
    catch(error){
        console.log("error in update",error)
    }

  };

return ( <div className="settings-page"> <DashboardNavbar />
  <div className="settings-layout">
    <DashboardSidebar />

    <main className="settings-content">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account settings and preferences.</p>
      </div>

      <section className="settings-profile-card">
        <div className="settings-section-header">
          <h2>Profile Information</h2>
          <p>Manage your personal account information.</p>
        </div>

        <form onSubmit={handleSave}>
          <div className="settings-form-group">
            <label htmlFor="profile-name">Full Name</label>

            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              readOnly={!isEditing}
              required
            />
          </div>

          <div className="settings-form-group">
            <label htmlFor="profile-email">Email Address</label>

            <input
              id="profile-email"
              type="email"
              value={user?.email || ""}
              readOnly
            />
          </div>

          <div className="settings-actions">
            {isEditing ? (
              <>
                <button type="submit" className="settings-save-btn">
                  Save Changes
                </button>

                <button
                  type="button"
                  className="settings-cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                className="settings-edit-btn"
                onClick={handleEdit}
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </section>
    </main>
  </div>
</div>
);
}

export default Settings;
