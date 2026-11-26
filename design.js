function designChoices(root, key, a, b, c, hyp, controlExtras=[]){
 const pool=[...new Set([a,b,c,...controlExtras,'실험 도구의 색깔'])].filter(Boolean);let z={};try{z=JSON.parse(localStorage.getItem('v8-design:'+key))||{}}catch{};
 const persist=()=>{try{localStorage.setItem('v8-design:'+key,JSON.stringify(z))}catch{}};
 const order=pool.slice().sort((x,y)=>x.localeCompare(y,'ko'));root.replaceChildren();
 const h=document.createElement('h3');h.textContent='실험 설계';root.append(h);
 const predictions=[`${a}을(를) 바꾸면 ${c}이(가) 증가한다`,`${a}을(를) 바꾸면 ${c}이(가) 감소한다`,`${a}을(를) 바꾸어도 ${c}은(는) 변하지 않는다`,`${a}에 따라 ${c}이(가) 달라지지만 방향은 조건에 따라 다르다`];
 function pick(label,k,items){let l=document.createElement('label');l.textContent=label+' ';let s=document.createElement('select');s.append(new Option('선택하세요',''));items.forEach(v=>s.append(new Option(v,v)));s.value=z[k]||'';s.onchange=()=>{z[k]=s.value;persist();if(k==='hyp'){hyp.value=s.value;hyp.dispatchEvent(new Event('input'));hyp.dispatchEvent(new Event('change'))}};l.append(s);root.append(l);return s}
 let hs=pick('가설 설정','hyp',predictions);hyp.value=hs.value;pick('조작 변인','iv',order);pick('종속 변인','dv',order);let l=document.createElement('div');l.textContent='통제 변인 (복수 선택)';order.forEach(v=>{let row=document.createElement('label'),ch=document.createElement('input');ch.type='checkbox';ch.checked=(z.cv||[]).includes(v);ch.onchange=()=>{z.cv=ch.checked?[...new Set([...(z.cv||[]),v])]: (z.cv||[]).filter(x=>x!==v);persist()};row.append(ch,document.createTextNode(' '+v));l.append(row)});root.append(l);
}