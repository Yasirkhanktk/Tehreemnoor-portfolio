import { createBrowserRouter, RouterProvider } from 'react-router';
import { PublicSite } from './PublicSite';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';
import { ManageProjects } from './admin/ManageProjects';
import { ManageTestimonials } from './admin/ManageTestimonials';
import { ManageExperience } from './admin/ManageExperience';
import { ProtectedRoute } from './admin/ProtectedRoute';
import { Toaster } from 'sonner';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicSite />,
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: 'projects',
        element: <ManageProjects />,
      },
      {
        path: 'testimonials',
        element: <ManageTestimonials />,
      },
      {
        path: 'experience',
        element: <ManageExperience />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}