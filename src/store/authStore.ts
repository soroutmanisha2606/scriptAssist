import { create} from 'zustand';
const useAuthStore = create((set) =>({
    user:null,
    isAuthenticated: localStorage.getItem('auth') === "true",
    login:(userData: any) =>{ set({user:userData});set({isAuthenticated:true});localStorage.setItem("auth","true")},
    logout:()=>{set({user:null});
set({isAuthenticated:false});localStorage.removeItem("auth");}

}));
export default useAuthStore;
