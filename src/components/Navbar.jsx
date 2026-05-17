import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LogOut, Briefcase, User, BookOpen, CheckSquare } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const { currentUser, role, logout } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  function handleLogout() {
    logout()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to={currentUser ? (role === 'employer' ? '/employer' : '/dashboard') : '/'} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-sm">T</span>
          </div>
          <span className="font-black text-xl text-slate-800">Talently</span>
        </Link>

        {currentUser && (
          <div className="flex items-center gap-1 sm:gap-2">
            {role === 'candidate' && (
              <>
                <NavLink to="/dashboard" icon={<User size={16} />} label="Mi Perfil" active={isActive('/dashboard')} />
                <NavLink to="/challenges" icon={<BookOpen size={16} />} label="Retos" active={isActive('/challenges')} />
                <NavLink to="/validate" icon={<CheckSquare size={16} />} label="Validar" active={isActive('/validate')} />
              </>
            )}
            {role === 'employer' && (
              <>
                <NavLink to="/employer" icon={<Briefcase size={16} />} label="Buscar Talento" active={isActive('/employer')} />
              </>
            )}

            <div className="flex items-center gap-2 ml-3 pl-3 border-l border-slate-200">
              <div className={`w-8 h-8 rounded-lg ${currentUser.avatarColor || 'bg-violet-500'} flex items-center justify-center text-white font-bold text-xs`}>
                {currentUser.initials || currentUser.name?.[0] || 'U'}
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        )}

        {!currentUser && (
          <Link to="/login" className="btn-primary py-2 px-4 text-sm">
            Ingresar
          </Link>
        )}
      </div>
    </nav>
  )
}

function NavLink({ to, icon, label, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        active ? 'bg-violet-50 text-violet-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Link>
  )
}
