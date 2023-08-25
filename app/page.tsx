// 'use client';
// import React, { useState, useEffect } from 'react';
// import inputData from './input.json';

// import './App.css'; // We'll add styles in this file

// let clauseCounter = 1; // global clause counter



// function Block({ data }: {data: any}) {
//   if (!data || !data.type) return null;
//   console.log(data);
//   switch (data.type) {
//     case 'h1':
//       return <h1>{data.children.map((child: any) => <Text key={child.text} data={child} />)}</h1>;
//     case 'p':
//       return <p>{data.children.map((child: any) => <Text key={child.text} data={child} />)}</p>;
//     case 'block':
//       return <Block key={child.text} data={child} />
// ;
//     case 'clause':
//       return <Clause data={data} />;
//     case 'ul':
//       return (
//         <ul>
//           {data.children.map((child, index) => (
//             <li key={index}>{child.children.map(c => <Text key={c.text} data={c} />)}</li>
//           ))}
//         </ul>
//       );
//     default:
//             return null;
  
//   }
// }

// function Text({ data }) {
//   if (data.bold) return <strong>{data.text}</strong>;
//   if (data.type === 'mention') return <Mention data={data} />;
//   return data.text;
// }

// function Clause({ data }) {
//   return (
//     <div className="clause">
//       <h4>
//         {clauseCounter++}. {data.title}
//       </h4>
//       {data.children.map((child, index) => (
//         <Block key={index} data={child} />
//       ))}
//     </div>
//   );
// }

// function Mention({ data }) {
//   return (
//     <span className="mention" style={{ backgroundColor: data.color }}>
//       {data.children[0].text}
//     </span>
//   );
// }

// function App() {
//   const [documentData, setDocumentData] = useState([]);
//   useEffect(() => {
//     // Fetch the data from the local JSON file
//     fetch("/input.json")
//       .then((response) => response.json())
//       .then((documentData) => {
//         // Set the data into state
//         setDocumentData(documentData);
//       })
//       .catch((error) => {
//         console.error("Error fetching the JSON data:", error);
//       });
//   }, []);
//   console.log(documentData);

//   return (
//     <div className="App">

//       <h1>Document</h1>

//       {documentData.map((block, index) => (

//         <Block key={index} data={block} />
//       ))}
//     </div>
//   );
// }

// export default App;

// ``
'use client';
import React, { useState, useEffect } from 'react';
import './App.css';
import Contract from './Contract.tsx';



function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/input.json')
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the JSON file:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Contract data={data} />
    </div>
  );
}


export default App;
