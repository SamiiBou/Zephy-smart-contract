import { createBrowserRouter } from 'react-router-dom';

import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

export default router;