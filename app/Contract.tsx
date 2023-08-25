import React, { useRef } from 'react';

const Contract = ({ data }) => {
  const clauseCounter = useRef(1);

    interface Block {
    type: string;
    children: any;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    parent?: any;
  }
  let parent = null;

  const renderBlock = (block:Block) => {

    switch (block.type) {
      case 'block':
        return (
          <div className='whitespace-pre'>
            {block.children.map(renderBlock)}
          </div>
        );
      case 'p':
        return<div className ='whitespace-pre'>

        <p>{block.children.map(renderElement)}</p>
          <br></br>
        </div>
      case 'clause':
        let clauseNumber = clauseCounter.current++;

        return (
          <div className="whitespace-pre ">
            {clauseNumber } {block.children.map(renderBlock)}
          <br></br>
          </div>
        );

      case 'li':
          return block.children.map(renderBlock);
      case 'ul':
            return block.children.map(renderBlock);
  
      case 'lic':
          return (
              <li>
                  <span className="clause-number">

                  {block.children.map(renderElement)}
                  </span>
              </li>
          );
      case 'h1':
        return <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{block.children.map(renderElement)}</h1>;
        
      
      default:
                return <div>{block.children.map(renderElement)}</div>;

    }
  };



  const renderElement = (element) => {
    if (element.type === 'mention') {
      return (
        <span
          key={element.id}
          style={{ backgroundColor: element.color }}
          title={element.title}
        >
          {element.children[0].text}
        </span>
      );
      
    } else if (element.underline) {
      return <u>{element.text}</u>;

    } else if (element.bold) {
      return <strong>{element.text}</strong>;
    } else if (element.italic) {
      return <em>{element.text}</em>;
    }
    else if (element.type === 'clause') {
      return (
        <div className="whitespace-pre ">
         <br></br>
          {element.children.map(renderBlock)}
        </div>
      );
    }
    else {
      return element.text;
    }
  };

  return <div>{data.map(renderBlock)}</div>;
};

export default Contract;
