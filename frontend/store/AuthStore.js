import create from 'zustand';
import axios from 'axios'
// define the store
const authStore = create(set => ({
    user: null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
    candidate: 0,
    applied: false,
    setAuthUser: async () => {
        set({ isLoading: true })
        const { data } = await axios.get('/api/auth/user');
        set({ user: data.user, isLoading: false })
        // set({ isLoading: false })
    },
    checkHandler: (checkBoxName, checkBoxVal) => {
        let queryParams;
        if (typeof window !== 'undefined') {
            queryParams = new URLSearchParams(window.location.search);
            const value = queryParams.get(checkBoxName);
            if (value == checkBoxVal) {
                return true
            }
            return false
        };
    },
    setCandidate: (value) => set(state => ({ ...state, candidates: value })),
    setUser: (user) => set(state => ({ ...state, user: user })),
    setIsAuthenticated: (isAuthenticated) => set(state => ({ ...state, isAuthenticated: isAuthenticated })),
    setLoading: (isLoading) => set({ isLoading: isLoading }),
    setApplied: (isApplied) => set({ applied: isApplied }),

    setError: (error) => set(state => ({ ...state, error: error })),


}));


// const useStore = create(set => ({
//     votes: 0,
//     addVotes: () => set(state => ({ votes: state.votes + 1 })),
//     subtractVotes: () => set(state => ({ votes: state.votes - 1 })),
//   }));

export default authStore;