import classes from './RequestDetail.module.css';
import { useEffect, useState } from 'react';
import { baseURL } from '../utils.ts';
import DisplayObject from './DisplayObject.tsx';

interface RequestDetailProps {
  binName: string,
  selectedHash: string | null,
}

const RequestDetail = ({ binName, selectedHash }: RequestDetailProps) => {
  const [selected, setSelected] = useState<any>({});

  const makeRequest = async () => {
    let url = `${baseURL}/api/${binName}/requests/${selectedHash}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log('RequestDetail: data', data)
      
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=> {
    if (selectedHash) {
      makeRequest().then(data => {
        // console.log('RequestDetail data: ', data);
        
        setSelected(data)
        
      });
    }
  }, [selectedHash]);

  let content = null;
  if (selectedHash) {
    content = [
      <h4 key={selected + 1}>Headers</h4>,
      <DisplayObject key={selected + 2} obj={selected.headers} />,
      <div key={selected + 3} className={classes.spacer}></div>,
      <h4 key={selected + 4}>Body</h4>,
      <DisplayObject key={selected + 5} obj={selected.body} />,
    ];
  }
  return (
    <div className={classes.container}>
      <h1>Request Detail</h1>
      {content}
    </div>
  )
};

export default RequestDetail;
