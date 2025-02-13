import { create} from 'zustand';
const useAuthStore = create((set) =>({
    user:null,
    login:(userData: any) => set({user:userData}),
    logout:()=>set({user:null})

}));
export default useAuthStore;
