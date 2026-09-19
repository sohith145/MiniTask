import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css"
function App() {
  return (
    <div className="app-root">
      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            success: "toast-success",
            error: "toast-error",
          },
        }}
      />
      <Outlet />
    </div>
  );
}

export default App;
