/* eslint-disable react/prop-types */

import { forwardRef } from "react"
import './Dialog.css'


export const Dialog = forwardRef(function Dialog({ children }, ref) {
  return (
    <dialog
      className='gift__dialog'
      ref={ref}
    >
      <div>
        {children}
      </div>
    </dialog>
  );
});

