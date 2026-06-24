import React, { useState, useEffect, useRef } from 'react';
import '../styles/CommandPalette.css';
import { getAllProfiles } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CommandPalette = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(()=>{
    if(open){
      getAllProfiles().then(r=>{setItems(r.data.data||[]); setFiltered(r.data.data||[]);});
      setTimeout(()=>inputRef.current?.focus(),100);
    }
  },[open]);

  useEffect(()=>{
    const f = items.filter(it=> (it.username + ' ' + (it.name||'')).toLowerCase().includes(query.toLowerCase()));
    setFiltered(f);
    setIndex(0);
  },[query,items]);

  useEffect(()=>{
    const onKey = (e)=>{
      if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){
        e.preventDefault();
        onClose(false);
      }
      if(e.key==='Escape') onClose(false);
      if(e.key==='ArrowDown') setIndex(i=>Math.min(i+1, filtered.length-1));
      if(e.key==='ArrowUp') setIndex(i=>Math.max(i-1,0));
      if(e.key==='Enter' && filtered[index]){
        navigate(`/profile/${filtered[index].username}`);
        onClose(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return ()=>window.removeEventListener('keydown', onKey);
  },[filtered,index,navigate,onClose]);

  if(!open) return null;

  return (
    <div className="cp-overlay" onMouseDown={()=>onClose(false)}>
      <div className="cp" onMouseDown={e=>e.stopPropagation()}>
        <input ref={inputRef} value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search profiles..." />
        <div className="cp-list">
          {filtered.slice(0,10).map((p,i)=> (
            <div key={p.username} className={`cp-item ${i===index?'active':''}`} onClick={()=>{navigate(`/profile/${p.username}`); onClose(false);}}>
              <img src={p.avatar_url} alt=""/>
              <div>
                <div className="n">{p.name||p.username}</div>
                <div className="u">@{p.username}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
