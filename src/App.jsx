import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { WishlistProvider } from './context/WishlistContext'
import RootLayout from './components/layout/RootLayout'

// Production Pages
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import PropertyDetailPage from './pages/PropertyDetailPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import WishlistPage from './pages/WishlistPage'
import DashboardPage from './pages/DashboardPage'
import OwnerDashboardPage from './pages/OwnerDashboardPage'
import AddPropertyPage from './pages/AddPropertyPage'
import ChatPage from './pages/ChatPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WishlistProvider>
          <RootLayout>
            <Routes>
              {/* Core Landing & Discovery */}
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/property/:id" element={<PropertyDetailPage />} />

              {/* Authentication */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Tenant Tools & Shortlisting */}
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />

              {/* Landlord & Property Owner Portal */}
              <Route path="/owner/dashboard" element={<OwnerDashboardPage />} />
              <Route path="/owner/add-property" element={<AddPropertyPage />} />

              {/* Direct Messaging */}
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/chat/:id" element={<ChatPage />} />

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </RootLayout>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
