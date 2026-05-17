import { createContext, useContext, useState } from 'react'
import { CANDIDATES } from '../data/mockData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [role, setRole] = useState(null) // 'candidate' | 'employer'
  const [completedChallenges, setCompletedChallenges] = useState([])
  const [earnedBadges, setEarnedBadges] = useState([])
  const [peerValidations, setPeerValidations] = useState([])

  function loginAsCandidate(userId = 'u1') {
    const user = CANDIDATES.find(c => c.id === userId) || CANDIDATES[0]
    setCurrentUser(user)
    setRole('candidate')
  }

  function loginAsEmployer() {
    setCurrentUser({ id: 'emp1', name: 'Recursos Humanos BCP', company: 'BCP' })
    setRole('employer')
  }

  function logout() {
    setCurrentUser(null)
    setRole(null)
  }

  function addCompletedChallenge(challenge, result) {
    setCompletedChallenges(prev => [
      { ...challenge, result, completedAt: new Date().toISOString() },
      ...prev
    ])
    if (result.badge) {
      setEarnedBadges(prev => [result.badge, ...prev])
    }
  }

  function addPeerValidation(validation) {
    setPeerValidations(prev => [validation, ...prev])
  }

  return (
    <AppContext.Provider value={{
      currentUser, role, completedChallenges, earnedBadges, peerValidations,
      loginAsCandidate, loginAsEmployer, logout,
      addCompletedChallenge, addPeerValidation
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
