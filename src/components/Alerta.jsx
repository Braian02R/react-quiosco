import React from 'react';


export default function Alerta({ children }) {
    const childrenArray = React.Children.toArray(children);
    
    return (
      <div className="text-center my-2 bg-red-600 text-white font-bold p-3 uppercase">
        {childrenArray.map((child, i) => (
          <React.Fragment key={i}>
            {child}
            {index < childrenArray.length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    );
  }