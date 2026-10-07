import { useEffect } from 'react';
import Route from './route'
import * as NavigationBar from 'expo-navigation-bar'

export default function App(){
  useEffect(()=>{
    NavigationBar.setVisibilityAsync('hidden')
  }, [])
  return (
    <Route/>
  );
}
