import { useEffect } from 'react';
import Route from './route'
import {AgendamentosProvider} from './src/context/AgendamentosContext'

export default function App(){
  useEffect(()=>{
    NavigationBar.setVisibilityAsync('hidden')
  }, [])
  return (
    <AgendamentosProvider>
      <Route/>
    </AgendamentosProvider>
  );
}