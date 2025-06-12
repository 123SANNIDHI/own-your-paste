import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';


let initialPastes = [];
try {
  const stored = localStorage.getItem('pastes');
  if (stored) initialPastes = JSON.parse(stored);
} catch (e) {
  initialPastes = [];
}

const initialState = {
  pastes: initialPastes,
};

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      const paste=action.payload;
      state.pastes.push(paste);
      localStorage.setItem('pastes',JSON.stringify(state.pastes));
      toast("added successufully!")   
    },
    updateToPastes: (state,action) => {
      const paste=action.payload;
      const index = state.pastes.findIndex((item)=> item._id === paste._id);
      if(index>=0){
        state.pastes[index]=paste;
        localStorage.setItem('pastes',JSON.stringify(state.pastes));
        toast.success("paste updated");
      }
      
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem('pastes');
      toast.success("all pastes removed");

    },
    removePastes: (state, action) => {
      const pasteId=action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem('pastes', JSON.stringify(state.pastes));
        toast.success("paste removed");
      } 
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes,removePastes} = pasteSlice.actions

export default pasteSlice.reducer