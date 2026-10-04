"use client"

import { store } from "@/stores/store";
import { Provider } from "react-redux";

export function ReduxProvider({children}: React.PropsWithChildren) {
  return(
    <Provider store={store} >
      {children}
    </Provider>
  )
}
