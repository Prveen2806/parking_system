import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/scss/index.scss";
const GlobalContextProvider = lazy(()=> import("@context/index"))
const App = lazy(()=> import("./App"))
createRoot(document.getElementById('root')!).render(
 <Suspense fallback={<div>Loading...</div>}>
   <GlobalContextProvider>
    <App />
   </GlobalContextProvider>
  </Suspense>
)
