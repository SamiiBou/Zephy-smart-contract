import { createBrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import SelectAvatar from './pages/SelectAvatar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register/>,
  },
  {
    path: "select-avatar",
    element: <SelectAvatar/>,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

export default router;